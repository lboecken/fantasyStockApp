from flask import Flask

from server.api.ping import ping_blueprint


def create_app():
    app = Flask(__name__)

    app.config.from_object("server.config.DevelopmentConfig")

    app.register_blueprint(ping_blueprint)

    return app
