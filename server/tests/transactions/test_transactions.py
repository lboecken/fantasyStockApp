import json

from server.api.portfolio.models import CashBalance
from server.api.portfolio.models import Holdings
from server.api.transactions.models import Transactions


fake_transaction_tsla = {'TYPE': 'BUY', 'SYMBOL': 'TSLA',
                         "NUM_OF_SHARES": 6, 'COST_BASIS_PER_SHARE': 100, 'TOTAL': 600}

fake_transaction_twtr = {'TYPE': 'BUY', 'SYMBOL': 'TWTR',
                         "NUM_OF_SHARES": 6, 'COST_BASIS_PER_SHARE': 100, 'TOTAL': 600}


def test_buy_response(test_app, test_db, fake_user):
    # GIVEN
    client = test_app.test_client()
    access_token = fake_user['access_token']
    # WHEN
    response = client.put(
        '/txn/buy',
        headers={'Authorization': f'Bearer {access_token}'},
        data=json.dumps(
            {'transaction':
             fake_transaction_twtr}),
        content_type='application/json')
    data = json.loads(response.data.decode())
    # THEN
    assert response.status_code == 200
    assert data['message'] == 'buy transaction posted'


def test_buy_no_access_token(test_app, test_db):
    # GIVEN
    client = test_app.test_client()
    # WHEN
    response = client.put(
        '/txn/buy',
        data=json.dumps(
            {'transaction':
             fake_transaction_twtr}),
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
    client.put(
        '/txn/buy',
        headers={'Authorization': f'Bearer {access_token}'},
        data=json.dumps(
            {'transaction':
             fake_transaction_tsla
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
        cash_balance_before_transaction) - 600

    assert stock_holding.symbol == "TSLA"
    assert stock_holding.number_of_shares == 6
    assert stock_holding.user_id == fake_user['user_id']

    assert transaction.symbol == "TSLA"
    assert transaction.number_of_shares == 6
    assert transaction.cost_basis_per_share == 100
    assert transaction.total_transaction_amount == 600
    assert transaction.type == 'BUY'
    assert transaction.user_id == fake_user['user_id']
