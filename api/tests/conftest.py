import json

import pytest

from flask_sqlalchemy import Model
from api import create_app, db

from api.endpoints.models import User


@pytest.fixture(scope="module")
def test_app():
    app = create_app()
    app.config.from_object("api.config.TestingConfig")
    with app.app_context():
        yield app


@pytest.fixture(scope="module")
def test_db():
    db.create_all()
    yield db
    db.session.remove()
    db.drop_all()


@pytest.fixture(scope="function")
def clear_db():
    meta = db.metadata
    for table in reversed(meta.sorted_tables):
        db.session.query(table).delete()
    db.session.commit()


@pytest.fixture(scope="module")
def fake_user(test_app, test_db):
    client = test_app.test_client()
    client.put(
        '/auth/register',
        data=json.dumps({'username': 'john', 'password': 'password'}),
        content_type='application/json')
    login_response = client.put(
        '/auth/login',
        data=json.dumps({'username': 'john', 'password': 'password'}),
        content_type='application/json')
    login_response_data = json.loads(login_response.data.decode())
    user = User.query.filter_by(username='john').one_or_none()
    fake_user = {'username': user.username,
                 "user_id": user.id,
                 'access_token': login_response_data['access_token']}
    yield fake_user
