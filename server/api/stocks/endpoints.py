import os
from json import JSONDecodeError

import requests
from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from flask_restx import Api, Resource

stocks_blueprint = Blueprint('stocks', __name__, url_prefix='/stocks')
api = Api(stocks_blueprint)

token = os.getenv('IEX_API_TOKEN')


@api.route('/price/<symbol>')
class Price(Resource):
    @jwt_required()
    def get(self, symbol):
        response = requests.get(
            f'https://cloud.iexapis.com/stable/stock/{symbol}/quote/?token={token}')
        try:
            response_object = {"data": response.json()}
            return response_object, 200
        except JSONDecodeError:
            response_object = {'message': 'Unknown symbol'}
            return response_object, 400
