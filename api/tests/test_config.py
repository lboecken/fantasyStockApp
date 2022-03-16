import os


def test_testing_config(test_app):
    test_app.config.from_object('api.config.TestingConfig')
    assert test_app.config["SQLALCHEMY_DATABASE_URI"] == os.getenv(
        "TESTING_DATABASE_URL"
    )
    assert test_app.config["TESTING"] == True
    assert test_app.config['SECRET_KEY'] == 'my_secret'
    assert not test_app.config['PRESERVE_CONTEXT_ON_EXCEPTION']


def test_production_config(test_app):
    test_app.config.from_object('api.config.ProductionConfig')
    assert test_app.config['SQLALCHEMY_DATABASE_URI'] == os.getenv(
        'DATABASE_URL')
    assert not test_app.config['TESTING']
    assert test_app.config['SECRET_KEY'] == 'my_secret'


def test_development_config(test_app):
    test_app.config.from_object('api.config.DevelopmentConfig')
    assert test_app.config['SQLALCHEMY_DATABASE_URI'] == os.getenv(
        'DATABASE_URL')
    assert not test_app.config['TESTING']
    assert test_app.config['SECRET_KEY'] == 'my_secret'
