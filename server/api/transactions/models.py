from sqlalchemy import func

from server import db


class Transactions(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    type = db.Column(db.String(20), nullable=False)
    symbol = db.Column(db.String(20), nullable=False)
    number_of_shares = db.Column(db.Integer, nullable=False)
    cost_basis_per_share = db.Column(db.Integer, nullable=False)
    total_transaction_amount = db.Column(db.Float, nullable=False)
    created_date = db.Column(
        db.DateTime, default=func.now(), nullable=False)
