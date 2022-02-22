from urllib import response
from flask import Blueprint, request
from flask_restx import Api, Resource
from flask_jwt_extended import jwt_required, current_user

from server import db
from server.api.models import Holdings
from server.api.models import CashBalance

portfolio_blueprint = Blueprint(
    'portfolio', __name__, url_prefix='/portfolio')
api = Api(portfolio_blueprint)


@api.route('/holdings')
class PortfolioHoldings(Resource):
    @jwt_required()
    def get(self):
        holdings = Holdings.query.filter_by(id=current_user.id).all()
        if holdings == []:
            response_object = {'holdings': [],
                               'message': 'no holdings'}
            return response_object, 200
        response_object = {'holdings': 'test'}
        return response_object, 200


@api.route('/cash')
class PortfolioCash(Resource):
    @jwt_required()
    def get(self):
        cash_balance = CashBalance.query.filter_by(
            id=current_user.id).one_or_none()
        response_object = {'cash_balance': cash_balance.balance}
        return response_object, 200
