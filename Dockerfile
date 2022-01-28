FROM python:3.9.5-slim-buster
# creates the working dir on the image
WORKDIR /urs/src/app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONBUFFERED=1
# installs dependencies
RUN apt-get update && \
apt-get install -y netcat gcc postgresql libpq-dev && \
apt-get clean
# gets the requirement files and installs them
COPY ./requirements.txt .
RUN pip install -r requirements.txt
# copies the rest of the app over
COPY . .
# copies over the entrypoint & gives it execution permission
COPY ./entrypoint.sh .
RUN chmod +x /urs/src/app/entrypoint.sh