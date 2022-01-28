import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from server.api.ping import ping_blueprint

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)

    app_settings = os.getenv("APP_SETTINGS")
    app.config.from_object(app_settings)

    db.init_app(app)

    app.register_blueprint(ping_blueprint)

    @app.shell_context_processor
    def ctx():
        return {"app": app, "db": db}

    return app
