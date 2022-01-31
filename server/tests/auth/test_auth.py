import json


def test_register_user(test_app, test_db):
    # GIVEN
    client = test_app.test_client()
    # WHEN
    response = client.put(
        '/api/auth/register',
        data=json.dumps({'username': 'john', 'password': 'password'}),
        content_type='application/json')
    data = json.loads(response.data.decode())
    # THEN
    assert response.status_code == 201
    assert 'john was registered' in data['message']
