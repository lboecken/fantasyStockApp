from flask import Blueprint, request
from flask_restx import Api, Resource
from flask_jwt_extended import jwt_required, current_user

from server import db
from server.api.models import Holdings
from server.api.models import CashBalance

portfolio_blueprint = Blueprint('portfolio', __name__, url_prefix='/portfolio')
api = Api(portfolio_blueprint)


@api.route('/holdings')
class PortfolioHoldings(Resource):
    @jwt_required()
    def get(self):
        pass


@api.route('/cash')
class PortfolioCash(Resource):
    def get(self):
        pass
