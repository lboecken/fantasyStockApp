import json
from os import access

from api.endpoints.portfolio.models import Holdings


buy_transaction_tsla = {'TYPE': 'BUY', 'SYMBOL': 'TSLA',
                        "NUM_OF_SHARES": 6, 'COST_BASIS_PER_SHARE': 100,
                        'TOTAL': 600}

buy_transaction_twtr = {'TYPE': 'BUY', 'SYMBOL': 'TWTR',
                        "NUM_OF_SHARES": 6, 'COST_BASIS_PER_SHARE': 100,
                        'TOTAL': 600}

buy_transaction_meta = {'TYPE': 'BUY', 'SYMBOL': 'META',
                        "NUM_OF_SHARES": 6, 'COST_BASIS_PER_SHARE': 100,
                        'TOTAL': 600}


def test_holdings_response(test_app, test_db, fake_user):
    # GIVEN
    client = test_app.test_client()
    access_token = fake_user['access_token']
    # WHEN
    response = client.get('/portfolio/holdings',
                          headers={'Authorization': f'Bearer {access_token}'})
    data = json.loads(response.data.decode())
    # THEN
    assert response.status_code == 200
    assert data.get('holdings') is not None


def test_holdings_get(test_app, test_db, fake_user):
    # GIVEN
    client = test_app.test_client()
    access_token = fake_user['access_token']
    test_db.session.add(Holdings(
        user_id=fake_user['user_id'], number_of_shares=6, symbol='TSLA'))
    test_db.session.add(Holdings(
        user_id=fake_user['user_id'], number_of_shares=6, symbol='META'))
    test_db.session.add(Holdings(
        user_id=fake_user['user_id'], number_of_shares=6, symbol='TWTR'))
    test_db.session.commit()
    # WHEN
    response = client.get('/portfolio/holdings',
                          headers={'Authorization': f'Bearer {access_token}'})
    data = json.loads(response.data.decode())
    # THEN
    assert data['holdings']


def test_holdings_with_no_holdings(test_app, test_db, fake_user):
    # GIVEN
    client = test_app.test_client()
    access_token = fake_user['access_token']
    test_db.session.query(Holdings).delete()
    test_db.session.commit()
    # WHEN
    response = client.get('/portfolio/holdings',
                          headers={'Authorization': f'Bearer {access_token}'})
    data = json.loads(response.data.decode())
    # THEN
    assert response.status_code == 200
    assert data['message'] == 'no holdings'
    assert data['holdings'] == []


def test_holdings_not_logged_in(test_app, test_db):
    # GIVEN
    client = test_app.test_client()
    # WHEN
    response = client.get('/portfolio/holdings')
    data = json.loads(response.data.decode())
    # THEN
    assert response.status_code == 401
    assert data['msg'] == 'Missing Authorization Header'


def test_cash_balance(test_app, test_db, fake_user):
    # GIVEN
    client = test_app.test_client()
    access_token = fake_user['access_token']
    # WHEN
    response = client.get(
        '/portfolio/cash', headers={'Authorization': f'Bearer {access_token}'})
    data = json.loads(response.data.decode())
    # THEN
    assert response.status_code == 200
    assert data['cash_balance'] == 100000
