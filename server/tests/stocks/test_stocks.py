import json


def test_stock_price_response(test_app, test_db, access_token):
    # GIVEN
    client = test_app.test_client()
    # WHEN
    response = client.get('/stocks/price/tsla',
                          headers={'Authorization': f'Bearer {access_token}'})
    data = json.loads(response.data.decode())
    # THEN
    assert response.status_code == 200
    assert data['data']['companyName'] == "Tesla Inc"


def test_stock_price_invalid_symbol(test_app, test_db, access_token):
    # GIVEN
    client = test_app.test_client()
    # WHEN
    response = client.get('/stocks/price/tsasla',
                          headers={'Authorization': f'Bearer {access_token}'})
    data = json.loads(response.data.decode())
    # THEN
    assert response.status_code == 400
    assert data['message'] == 'Unknown symbol'
