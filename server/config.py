import os


class BaseConfig:
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'my_secret'
    IEX_API_TOKEN = 'sk_acb5f125ad3a44e4b9ef1938598013d1'


class TestingConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = os.getenv("TESTING_DATABASE_URL")
    TESTING = True


class DevelopmentConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")


class ProductionConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
