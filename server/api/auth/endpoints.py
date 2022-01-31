from flask import Blueprint, request
from flask_restx import Resource, Api

from server import db
from server.api.models.model import User

auth_blueprint = Blueprint('auth', __name__)
api = Api(auth_blueprint)


@api.route('/register')
class Register(Resource):
    def put(self):
        put_data = request.get_json()
        username = put_data['username']
        password = put_data['password']

        user = User(username=username, password=password)
        db.session.add(user)
        db.session.commit()

        response_object = {'message': f'{username} was registered'}
        return response_object, 201
