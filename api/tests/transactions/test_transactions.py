import json

from api.models.portfolio import CashBalance
from api.models.portfolio import Holdings
from api.models.transactions import Transactions


buy_transaction_tsla = {'TYPE': 'BUY', 'SYMBOL': 'TSLA',
                        "NUM_OF_SHARES": 6, 'COST_BASIS_PER_SHARE': 100,
                        'TOTAL': 600}

buy_transaction_twtr = {'TYPE': 'BUY', 'SYMBOL': 'TWTR',
                        "NUM_OF_SHARES": 6, 'COST_BASIS_PER_SHARE': 100,
                        'TOTAL': 600}

buy_transaction_meta = {'TYPE': 'BUY', 'SYMBOL': 'META',
                        "NUM_OF_SHARES": 6, 'COST_BASIS_PER_SHARE': 100,
                        'TOTAL': 600}


sell_transaction_tsla = {'TYPE': 'SELL', 'SYMBOL': 'TSLA',
                         "NUM_OF_SHARES": 6, 'COST_BASIS_PER_SHARE': 100,
                         'TOTAL': 600}

sell_transaction_twtr = {'TYPE': 'SELL', 'SYMBOL': 'TWTR',
                         "NUM_OF_SHARES": 6, 'COST_BASIS_PER_SHARE': 100,
                         'TOTAL': 600}

sell_transaction_meta = {'TYPE': 'SELL', 'SYMBOL': 'META',
                         "NUM_OF_SHARES": 6, 'COST_BASIS_PER_SHARE': 100,
                         'TOTAL': 600}


def test_buy_response(test_app, test_db, fake_user):
    # GIVEN
    client = test_app.test_client()
    access_token = fake_user['access_token']
    # WHEN
    response = client.post(
        '/txn/buy',
        headers={'Authorization': f'Bearer {access_token}'},
        data=json.dumps(
            {'transaction':
             buy_transaction_twtr}),
        content_type='application/json')
    data = json.loads(response.data.decode())
    # THEN
    assert response.status_code == 200
    assert data['message'] == 'buy transaction posted'


def test_buy_no_access_token(test_app, test_db):
    # GIVEN
    client = test_app.test_client()
    # WHEN
    response = client.post(
        '/txn/buy',
        data=json.dumps(
            {'transaction':
             buy_transaction_twtr}),
        content_type='application/json')
    data = json.loads(response.data.decode())
    # THEN
    assert response.status_code == 401
    assert data['msg'] == 'Missing Authorization Header'


def test_buy_updated_db_on_valid_request(test_app, test_db, fake_user):
    # GIVEN
    client = test_app.test_client()
    access_token = fake_user['access_token']
    cash_balance_before_transaction = CashBalance.query.filter_by(
        id=fake_user['user_id']).one_or_none().balance
    # WHEN
    client.post(
        '/txn/buy',
        headers={'Authorization': f'Bearer {access_token}'},
        data=json.dumps(
            {'transaction':
             buy_transaction_tsla
             }),
        content_type='application/json')
    cash_balance_after_transaction = CashBalance.query.filter_by(
        id=fake_user['user_id']).one_or_none().balance
    stock_holding = Holdings.query.filter_by(
        symbol='TSLA').first()
    transaction = Transactions.query.filter_by(
        symbol='TSLA').first()
    # THEN
    assert int(cash_balance_after_transaction) == int(
        cash_balance_before_transaction) - buy_transaction_tsla['TOTAL']

    assert stock_holding.symbol == "TSLA"
    assert stock_holding.number_of_shares == 6
    assert stock_holding.user_id == fake_user['user_id']

    assert transaction.symbol == "TSLA"
    assert transaction.number_of_shares == 6
    assert transaction.cost_basis_per_share == 100
    assert transaction.total_transaction_amount == 600
    assert transaction.type == 'BUY'
    assert transaction.user_id == fake_user['user_id']


def test_buy_not_enough_cash(test_app, test_db, fake_user):
    # GIVEN
    client = test_app.test_client()
    access_token = fake_user['access_token']
    CashBalance.query.filter_by(
        id=fake_user['user_id']).update(dict(balance=0))
    test_db.session.commit()
    # WHEN
    response = client.post(
        '/txn/buy',
        headers={'Authorization': f'Bearer {access_token}'},
        data=json.dumps(
            {'transaction':
             buy_transaction_tsla
             }),
        content_type='application/json')
    data = json.loads(response.data.decode())
    # THEN
    assert response.status_code == 999
    assert data['message'] == 'insufficient funds to execute transactions'


def test_buy_multiple_purchases_same_stock(test_app, test_db, fake_user):
    # GIVEN
    client = test_app.test_client()
    access_token = fake_user['access_token']
    CashBalance.query.filter_by(
        id=fake_user['user_id']).update(dict(balance=100000))
    test_db.session.commit()
    client.post(
        '/txn/buy',
        headers={'Authorization': f'Bearer {access_token}'},
        data=json.dumps(
            {'transaction':
             buy_transaction_meta
             }),
        content_type='application/json')
    # WHEN
    response = client.post('/txn/buy',
                          headers={
                              'Authorization': f'Bearer {access_token}'},
                          data=json.dumps(
                              {'transaction':
                               buy_transaction_meta
                               }),
                          content_type='application/json')
    data = json.loads(response.data.decode())
    print(data['message'])
    # THEN
    holding = Holdings.query.filter_by(
        user_id=fake_user['user_id'], symbol='META').first()

    assert holding.number_of_shares == 12


def test_sell_response(test_app, test_db, fake_user):
    # GIVEN
    client = test_app.test_client()
    access_token = fake_user['access_token']
    client.post(
        '/txn/buy',
        headers={'Authorization': f'Bearer {access_token}'},
        data=json.dumps(
            {'transaction':
             buy_transaction_twtr}),
        content_type='application/json')
    # WHEN
    response = client.post(
        '/txn/sell',
        headers={'Authorization': f'Bearer {access_token}'},
        data=json.dumps(
            {'transaction':
             sell_transaction_twtr}),
        content_type='application/json')
    data = json.loads(response.data.decode())
    # THEN
    assert response.status_code == 200
    assert data['message'] == 'sell transaction posted'


def test_sell_no_access_token(test_app, test_db):
    # GIVEN
    client = test_app.test_client()
    # WHEN
    response = client.post(
        '/txn/sell',
        data=json.dumps(
            {'transaction':
             buy_transaction_twtr}),
        content_type='application/json')
    data = json.loads(response.data.decode())
    # THEN
    assert response.status_code == 401
    assert data['msg'] == 'Missing Authorization Header'


def test_sell_not_enough_stocks(test_app, test_db, fake_user):
    # GIVEN
    client = test_app.test_client()
    access_token = fake_user['access_token']
    test_db.session.query(Holdings).delete()
    test_db.session.commit()
    # WHEN
    response = client.post(
        '/txn/sell',
        headers={
            'Authorization': f'Bearer {access_token}'},
        data=json.dumps(
            {'transaction':
             sell_transaction_tsla
             }),
        content_type='application/json')
    data = json.loads(response.data.decode())
    # THEN
    assert response.status_code == 999
    assert data['message'] == 'insufficient stock holdings for transaction'


def test_sell_updated_db_on_valid_request(test_app, test_db, fake_user):
    # GIVEN
    client = test_app.test_client()
    access_token = fake_user['access_token']
    test_db.session.query(Holdings).delete()
    test_db.session.commit()
    client.post(
        '/txn/buy',
        headers={'Authorization': f'Bearer {access_token}'},
        data=json.dumps(
            {'transaction':
             buy_transaction_tsla
             }),
        content_type='application/json')
    stock_holding = Holdings.query.filter_by(
        symbol='TSLA').first()
    transaction = Transactions.query.filter_by(
        symbol='TSLA').first()
    cash_balance_before_transaction = CashBalance.query.filter_by(
        id=fake_user['user_id']).one_or_none().balance
    # WHEN
    client.post(
        '/txn/sell',
        headers={'Authorization': f'Bearer {access_token}'},
        data=json.dumps(
            {'transaction':
             sell_transaction_tsla
             }),
        content_type='application/json')
    cash_balance_after_transaction = CashBalance.query.filter_by(
        id=fake_user['user_id']).one_or_none().balance
    stock_holding = Holdings.query.filter_by(
        symbol='TSLA').first()
    transaction = Transactions.query.filter_by(
        symbol='TSLA', type="SELL").first()
    # THEN
    assert int(cash_balance_after_transaction) == int(
        cash_balance_before_transaction) + sell_transaction_tsla['TOTAL']

    assert stock_holding is None

    assert transaction.symbol == "TSLA"
    assert transaction.number_of_shares == 6
    assert transaction.cost_basis_per_share == 100
    assert transaction.total_transaction_amount == 600
    assert transaction.type == 'SELL'
    assert transaction.user_id == fake_user['user_id']


def test_sell_partial_holding_sale(test_app, test_db, fake_user):
    # GIVEN
    client = test_app.test_client()
    access_token = fake_user['access_token']
    client.post(
        '/txn/buy',
        headers={'Authorization': f'Bearer {access_token}'},
        data=json.dumps(
            {'transaction':
             buy_transaction_tsla
             }),
        content_type='application/json')
    client.post(
        '/txn/buy',
        headers={'Authorization': f'Bearer {access_token}'},
        data=json.dumps(
            {'transaction':
             buy_transaction_tsla
             }),
        content_type='application/json')
    # WHEN
    response = client.post(
        '/txn/sell',
        headers={'Authorization': f'Bearer {access_token}'},
        data=json.dumps(
            {'transaction':
             sell_transaction_tsla
             }),
        content_type='application/json')
    data = json.loads(response.data.decode())
    holding = Holdings.query.filter_by(
        user_id=fake_user['user_id'], symbol='TSLA').first()
    # THEN
    assert holding.number_of_shares == 6


def test_retrieve_no_access_token(test_app, test_db):
    # GIVEN
    client = test_app.test_client()
    # WHEN
    response = client.get('/txn/get_all')
    data = json.loads(response.data.decode())
    # THEN
    assert response.status_code == 401
    assert data['msg'] == 'Missing Authorization Header'

def test_transaction_get(test_app, test_db, fake_user):
    # GIVEN
    client = test_app.test_client()
    access_token = fake_user['access_token']
    # WHEN
    response = client.get('/txn/get_all',
                          headers={'Authorization': f'Bearer {access_token}'})
    data = json.loads(response.data.decode())
    # THEN
    assert data['transactions']


def test_holdings_with_no_holdings(test_app, test_db, fake_user):
    # GIVEN
    client = test_app.test_client()
    access_token = fake_user['access_token']
    test_db.session.query(Transactions).delete()
    test_db.session.commit()
    # WHEN
    response = client.get('/txn/get_all',
                          headers={'Authorization': f'Bearer {access_token}'})
    data = json.loads(response.data.decode())
    # THEN
    assert response.status_code == 200
    assert data['message'] == 'no transactions'
    assert data['transactions'] == []