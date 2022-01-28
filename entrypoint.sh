#!/bin/sh

echo 'waiting for postgres to start'
# netcat needs to check if the db has intiated
# the DB needs to start before the server
while ! nc -z db 5432; do
    sleep 0.1
done

echo 'postgres has started'

python manage.py run -h 0.0.0.0