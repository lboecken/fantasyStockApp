import sys
from flask.cli import FlaskGroup
from server import create_app, db
from server.api.models import User
from server.api.models import Transactions
from server.api.models import Holdings
from server.api.models import CashBalance


app = create_app()
# FlaskGroup is a special subclass whose grandparent is
# Group from the package click which allows custom commands.
# The app context is already available in this class.
cli = FlaskGroup(create_app=create_app)


@cli.command("recreate-db")
def recreate_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


if __name__ == "__main__":
    cli()
