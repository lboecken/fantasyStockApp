from flask import request, Blueprint
from flask_restx import Api, Resource

from server import db
from server.api.models import Transactions
from server.api.models import CashBalance
from server.api.models import Holdings

transaction_blueprint = Blueprint('txn', __name__, url_prefix='/txn')
api = Api(transaction_blueprint)


@api.route('/buy')
class Buy(Resource):
    def put(self):
        pass


@api.route('/sell')
class Sell(Resource):
    def put(self):
        pass
