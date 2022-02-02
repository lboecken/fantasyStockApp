from flask import Blueprint, request
from flask_restx import Resource, Api

from server import db
from server.api.auth.model import User

from server.api.portfolio.model import CashBalance

auth_blueprint = Blueprint('auth', __name__, url_prefix='/auth')
api = Api(auth_blueprint)


@api.route('/register')
class Register(Resource):
    def put(self):
        put_data = request.get_json()
        if not put_data:
            response_object = {'message': 'invalid payload'}
            return response_object, 400
        username = put_data['username']
        password = put_data['password']
        user = User.query.filter_by(username=username).first()
        if user:
            response_object = {
                'message': f'username {username} is already taken'}
            return response_object, 400
        db.session.add(User(username=username, password=password))
        db.session.commit()
        user = User.query.filter_by(username=username).first()
        db.session.add(CashBalance(user_id=user.id, balance=100000))
        db.session.commit()
        response_object = {'message': f'{username} was registered'}
        return response_object, 201


