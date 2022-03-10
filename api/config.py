import os


class BaseConfig:
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY")
    IEX_API_TOKEN = os.getenv("IEX_API_TOKEN")


class TestingConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = os.getenv("TESTING_DATABASE_URL")
    TESTING = True


class DevelopmentConfig(BaseConfig):
    ENV="development"
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")


class ProductionConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
