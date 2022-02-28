from flask import request, Blueprint
from flask_restx import Api, Resource
from flask_jwt_extended import jwt_required, current_user

from server import db
from server.api.models import Transactions
from server.api.models import CashBalance
from server.api.models import Holdings

transaction_blueprint = Blueprint('txn', __name__, url_prefix='/txn')
api = Api(transaction_blueprint)


@api.route('/buy')
class Buy(Resource):
    @jwt_required()
    def put(self):
        put_data = request.get_json()
        txn = put_data['transaction']
        if is_insufficient_cash(txn):
            response_object = {
                'message':  'insufficient funds to execute transactions'}
            return response_object, 999
        update_cash_balance(txn)
        update_stock_holdings(txn)
        record_transaction(txn)
        db.session.commit()
        response_object = {'message': 'buy transaction posted'}
        return response_object, 200


def is_insufficient_cash(txn):
    user_cash = CashBalance.query.filter_by(
        id=current_user.id).one_or_none().balance
    if user_cash < txn['TOTAL'] or user_cash <= 0:
        return True
    else:
        return False


def update_cash_balance(txn):
    current_balance = int(CashBalance.query.filter_by(
        id=current_user.id).one_or_none().balance)
    if txn['TYPE'] == 'BUY':
        CashBalance.query.filter_by(id=current_user.id).update(
            dict(balance=current_balance - txn["TOTAL"]))
    if txn['TYPE'] == 'SELL':
        CashBalance.query.filter_by(id=current_user.id).update(
            dict(balance=current_balance + txn["TOTAL"]))


def update_stock_holdings(txn):
    current_holding = Holdings.query.filter_by(
        user_id=current_user.id, symbol=txn['SYMBOL']).one_or_none()
    if current_holding is None:
        db.session.add(
            Holdings(
                user_id=current_user.id,
                symbol=txn['SYMBOL'],
                number_of_shares=txn['NUM_OF_SHARES'],
            )
        )
        db.session.commit()
    else:
        new_amount_of_shares = current_holding.number_of_shares + \
            txn['NUM_OF_SHARES']
        Holdings.query.filter_by(
            symbol=txn['SYMBOL']).filter_by(user_id=current_user.id).one_or_none().update(
                dict(number_of_shares=new_amount_of_shares))


def record_transaction(txn):
    db.session.add(Transactions(
        user_id=current_user.id,
        type=txn['TYPE'],
        symbol=txn['SYMBOL'],
        number_of_shares=txn['NUM_OF_SHARES'],
        cost_basis_per_share=txn['COST_BASIS_PER_SHARE'],
        total_transaction_amount=txn['TOTAL']
    )
    )


@api.route('/sell')
class Sell(Resource):
    def put(self):
        pass
