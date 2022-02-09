import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager


db = SQLAlchemy()
jwt = JWTManager()


def create_app():
    app = Flask(__name__)

    app_settings = os.getenv("APP_SETTINGS")
    app.config.from_object(app_settings)

    db.init_app(app)
    jwt.init_app(app)

    from server.api.ping import ping_blueprint
    app.register_blueprint(ping_blueprint)
    from server.api.auth.endpoints import auth_blueprint
    app.register_blueprint(auth_blueprint)
    from server.api.stocks.endpoints import stocks_blueprint
    app.register_blueprint(stocks_blueprint)
    from server.api.portfolio.endpoints import portfolio_blueprint
    app.register_blueprint(portfolio_blueprint)

    @app.shell_context_processor
    def ctx():
        return {"app": app, "db": db}

    return app
