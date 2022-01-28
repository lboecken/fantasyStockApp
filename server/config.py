import os


class BaseConfig:
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class TestingConfig(BaseConfig):
    TESTING = True


class DevelopmentConfig(BaseConfig):
    pass


class ProductionConfig(BaseConfig):
    pass
