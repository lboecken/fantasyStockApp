#!/bin/sh

echo 'waiting for postgres to start'
# netcat needs to check if the db has intiated
# the DB needs to start before the api
while ! nc -z db 5432; do
    sleep 0.1
done

echo 'postgres has started'

gunicorn -b :5000 --workers=1 manage:app