from flask import Blueprint
from flask_restx import Resource, Api
from flask_jwt_extended import jwt_required, current_user
ping_blueprint = Blueprint("ping", __name__)

api = Api(ping_blueprint)


class Ping(Resource):
    def get(self):
        return {"status": "success", "message": "pong"}

    @jwt_required()
    def post(self):
        return {
            'user_id': current_user.id,
            'username': current_user.username,
        }


api.add_resource(Ping, "/ping")
