import json

from server import db


def test_portfolio_holdings_response(test_app, test_db, access_token):
    # GIVEN
    client = test_app.test_client()
    # WHEN
    response = client.get('/portfolio/holdings',
                          headers={'Authorization': f'Bearer {access_token}'})
    data = json.loads(response.data.decode())
    # THEN
    assert response.status_code == 200
    assert data['holdings'] in data


def test_portfolio_holdings_not_logged_in(test_app, test_db):
    # GIVEN
    client = test_app.test_client()
    # WHEN
    response = client.get('/portfolio/holdings')
    data = json.loads(response.data.decode())
    # THEN
    assert response.status_code == 401
    assert data['msg'] == 'Missing Authorization Header'
