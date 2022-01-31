import os

from flask import Flask

from server.api.models import db

from server.api.ping import ping_blueprint
from server.api.auth.endpoints import auth_blueprint


def create_app():
    app = Flask(__name__)

    app_settings = os.getenv("APP_SETTINGS")
    app.config.from_object(app_settings)

    db.init_app(app)

    app.register_blueprint(ping_blueprint)
    app.register_blueprint(auth_blueprint)

    @app.shell_context_processor
    def ctx():
        return {"app": app, "db": db}

    return app
