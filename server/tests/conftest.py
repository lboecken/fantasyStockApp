import pytest
from server import create_app, db


@pytest.fixture(scope="module")
def test_app():
    app = create_app()
    app.config.from_object("server.config.TestingConfig")
    with app.app_context():
        yield app


@pytest.fixture(scope="module")
def test_db():
    db.create_all()
    yield db
    db.drop_all()
    db.session.remove()
