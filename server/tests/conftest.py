import pytest

from flask_sqlalchemy import Model
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
    db.session.remove()
    db.drop_all()


@pytest.fixture(scope="function")
def clear_db():
    meta = db.metadata
    for table in reversed(meta.sorted_tables):
        db.session.query(table).delete()
    db.session.commit()
