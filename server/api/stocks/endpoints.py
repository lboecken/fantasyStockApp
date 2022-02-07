import requests

from flask import Blueprint, request
from flask_restx import Resource, Api

stocks_blueprint = Blueprint('stocks', __name__, url_prefix='/stocks')
api = Api(stocks_blueprint)

token = ''


@api.route('/price/<symbol>')
class Price(Resource):
    def get(self, symbol):
        response = requests.get(
            f'https://cloud.iexapis.com/stable/stock/{symbol}/quote/?token={token}')
        return response.json(), 200
