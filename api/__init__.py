import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

from dotenv import load_dotenv

load_dotenv()


db = SQLAlchemy()
jwt = JWTManager()


def create_app():
    app = Flask(__name__)

    app_settings = os.getenv("APP_SETTINGS")
    app.config.from_object(app_settings)

    db.init_app(app)
    jwt.init_app(app)

    from api.api.models import User

    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_header, jwt_data):
        identity = jwt_data['sub']
        return User.query.filter_by(id=identity).one_or_none()

    from api.api.ping import ping_blueprint
    app.register_blueprint(ping_blueprint)
    from api.api.auth.endpoints import auth_blueprint
    app.register_blueprint(auth_blueprint)
    from api.api.stocks.endpoints import stocks_blueprint
    app.register_blueprint(stocks_blueprint)
    from api.api.portfolio.endpoints import portfolio_blueprint
    app.register_blueprint(portfolio_blueprint)
    from api.api.transactions.endpoints import transaction_blueprint
    app.register_blueprint(transaction_blueprint)

    @app.shell_context_processor
    def ctx():
        return {"app": app, "db": db}

    return app
