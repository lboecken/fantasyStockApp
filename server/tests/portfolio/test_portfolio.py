import json


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


def test_holdings_with_no_holdings(test_app, test_db, fake_user):
    # GIVEN
    client = test_app.test_client()
    access_token = fake_user['access_token']
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
