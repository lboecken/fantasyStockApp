
from dataclasses import asdict
from flask import Blueprint
from flask_restx import Api, Resource
from flask_jwt_extended import jwt_required, current_user

from api import db
from api.models import Holdings
from api.models import CashBalance

portfolio_blueprint = Blueprint(
    'portfolio', __name__, url_prefix='/portfolio')
api = Api(portfolio_blueprint)


@api.route('/holdings')
class PortfolioHoldings(Resource):
    @jwt_required()
    def get(self):
        holdings = Holdings.query.filter_by(user_id=current_user.id).all()
        if holdings == []:
            response_object = {'holdings': [],
                               'message': 'no holdings'}
            return response_object, 200
        serializable_holdings = []
        for holding in holdings:
            serializable_holdings.append(asdict(holding))
        response_object = {'holdings': serializable_holdings}
        return response_object, 200


@api.route('/cash')
class PortfolioCash(Resource):
    @jwt_required()
    def get(self):
        cash_balance = CashBalance.query.filter_by(
            id=current_user.id).one_or_none()
        response_object = {'cash_balance': cash_balance.balance}
        return response_object, 200
