from flask import request, Blueprint
from flask_restx import Api, Resource
from flask_jwt_extended import jwt_required, current_user
import jwt

from api import db
from api.endpoints.models import Transactions
from api.endpoints.models import CashBalance
from api.endpoints.models import Holdings

transaction_blueprint = Blueprint('txn', __name__, url_prefix='/txn')
api = Api(transaction_blueprint)


class Transaction():
    def _record_transaction(self, txn):
        db.session.add(Transactions(
            user_id=current_user.id,
            type=txn['TYPE'],
            symbol=txn['SYMBOL'],
            number_of_shares=txn['NUM_OF_SHARES'],
            cost_basis_per_share=txn['COST_BASIS_PER_SHARE'],
            total_transaction_amount=txn['TOTAL']
        )
        )


@api.route('/buy')
class Buy(Resource, Transaction):
    @jwt_required()
    def post(self):
        put_data = request.get_json()
        txn = put_data['transaction']
        if self._is_insufficient_cash(txn):
            response_object = {
                'message':  'insufficient funds to execute transactions'}
            return response_object, 999
        self._decrease_cash_balance(txn)
        self._buy_stock_holdings(txn)
        self._record_transaction(txn)
        db.session.commit()
        response_object = {'message': 'buy transaction posted'}
        return response_object, 200

    def _is_insufficient_cash(self, txn):
        user_cash = CashBalance.query.filter_by(
            id=current_user.id).first().balance
        if user_cash < txn['TOTAL'] or user_cash <= 0:
            return True
        else:
            return False

    def _decrease_cash_balance(self, txn):
        current_balance = int(CashBalance.query.filter_by(
            id=current_user.id).first().balance)
        CashBalance.query.filter_by(id=current_user.id).update(
            dict(balance=current_balance - txn["TOTAL"]))

    def _buy_stock_holdings(self, txn):
        current_holding = Holdings.query.filter_by(
            user_id=current_user.id, symbol=txn['SYMBOL']).first()
        if current_holding is None:
            db.session.add(
                Holdings(
                    user_id=current_user.id,
                    symbol=txn['SYMBOL'],
                    number_of_shares=txn['NUM_OF_SHARES'],
                )
            )
        else:
            new_amount_of_shares = current_holding.number_of_shares + \
                txn['NUM_OF_SHARES']
            current_holding.number_of_shares = new_amount_of_shares


@api.route('/sell')
class Sell(Resource, Transaction):
    @jwt_required()
    def post(self):
        put_data = request.get_json()
        txn = put_data['transaction']
        if self._is_insufficients_stocks(txn):
            response_object = {
                'message': 'insufficient stock holdings for transaction'}
            return response_object, 999
        self._increase_cash_balance(txn)
        self._sell_stock_holdings(txn)
        self._record_transaction(txn)
        db.session.commit()
        response_object = {'message': 'sell transaction posted'}
        return response_object, 200

    def _sell_stock_holdings(self, txn):
        current_holding = Holdings.query.filter_by(
            user_id=current_user.id, symbol=txn['SYMBOL']).first()
        new_amount_of_shares = current_holding.number_of_shares - \
            txn['NUM_OF_SHARES']
        if new_amount_of_shares == 0:
            db.session.delete(current_holding)
        else:
            current_holding.number_of_shares = new_amount_of_shares

    def _is_insufficients_stocks(self, txn):
        holding = Holdings.query.filter_by(
            user_id=current_user.id, symbol=txn['SYMBOL']).first()
        if holding is None or holding.number_of_shares < txn['NUM_OF_SHARES']:
            return True
        else:
            return False

    def _increase_cash_balance(self, txn):
        current_balance = int(CashBalance.query.filter_by(
            id=current_user.id).first().balance)
        CashBalance.query.filter_by(id=current_user.id).update(
            dict(balance=current_balance + txn["TOTAL"]))
