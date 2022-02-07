import json

import pytest

from server.api.auth.model import User

from server.api.portfolio.model import CashBalance


def test_register_user_response(test_app, test_db, clear_db):
    # GIVEN
    test_db.session.query(User).delete()
    client = test_app.test_client()
    # WHEN
    response = client.put(
        '/auth/register',
        data=json.dumps({'username': 'john', 'password': 'password'}),
        content_type='application/json')
    data = json.loads(response.data.decode())
    # THEN
    assert response.status_code == 201
    assert "john was registered" in data['message']


def test_register_username_taken(test_app, test_db, clear_db):
    # GIVEN
    client = test_app.test_client()
    client.put(
        '/auth/register',
        data=json.dumps({'username': 'john', 'password': 'password'}),
        content_type='application/json')
    # WHEN
    response = client.put(
        '/auth/register',
        data=json.dumps({'username': 'john', 'password': 'password'}),
        content_type='application/json')
    data = json.loads(response.data.decode())
    # THEN
    assert response.status_code == 400
    assert f"username john is already taken" in data['message']


def test_register_invalid_payload(test_app, test_db, clear_db):
    # GIVEN
    client = test_app.test_client()
    # WHEN
    response = client.put('/auth/register', data=json.dumps({}),
                          content_type='application/json')
    data = json.loads(response.data.decode())
    # THEN
    assert response.status_code == 400
    assert 'invalid payload' in data['message']


def test_register_create_user_in_db(test_app, test_db, clear_db):
    # GIVEN
    client = test_app.test_client()
    # WHEN
    response = client.put(
        '/auth/register',
        data=json.dumps({'username': 'john', 'password': 'password'}),
        content_type='application/json')
    user = User.query.filter_by(username='john').first()
    user_cash = CashBalance.query.filter_by(id=user.id).first()
    # THEN
    assert user.username == 'john'
    assert user_cash.balance == 100000


def test_login_response(test_app, test_db, clear_db):
    # GIVEN
    client = test_app.test_client()
    client.put(
        '/auth/register',
        data=json.dumps({'username': 'john', 'password': 'password'}),
        content_type='application/json')
    # WHEN
    response = client.put(
        '/auth/login',
        data=json.dumps({'username': 'john', 'password': 'password'}),
        content_type='application/json')
    data = json.loads(response.data.decode())
    # THEN
    assert response.status_code == 201
    assert 'john is logged in' in data['message']
    assert data['access_token']


def test_login_unregistered_user(test_app, test_db, clear_db):
    # GIVEN
    client = test_app.test_client()
    # WHEN
    response = client.put(
        '/auth/login',
        data=json.dumps({'username': 'john', 'password': 'password'}),
        content_type='application/json')
    data = json.loads(response.data.decode())
    # THEN
    assert response.status_code == 400
    assert 'john is not registered' in data['message']
    with pytest.raises(KeyError):
        data['access_token']


def test_login_invalid_credentials(test_app, test_db, clear_db):
    # GIVEN
    client = test_app.test_client()
    client.put(
        '/auth/register',
        data=json.dumps({'username': 'john', 'password': 'password'}),
        content_type='application/json')
    # WHEN
    response = client.put(
        '/auth/login',
        data=json.dumps({'username': 'john', 'password': 'wrong_password'}),
        content_type='application/json')
    data = json.loads(response.data.decode())
    # THEN
    assert response.status_code == 400
    assert 'invalid credentials' in data['message']
    with pytest.raises(KeyError):
        data['access_token']


def test_login_invalid_payload(test_app, test_db):
    # GIVEN
    client = test_app.test_client()
    # WHEN
    response = client.put(
        '/auth/login',
        data=json.dumps({}),
        content_type='application/json')
    data = json.loads(response.data.decode())
    # THEN
    assert response.status_code == 400
    assert 'invalid payload' in data['message']
    with pytest.raises(KeyError):
        data['access_token']
