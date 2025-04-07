FROM python:3.12-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libopencv-dev \
    && pip install --no-cache-dir pipenv

WORKDIR /app

COPY Pipfile Pipfile.lock ./

RUN pipenv install --deploy --ignore-pipfile

COPY hypercorn_config.py ./

COPY src/ ./src

CMD ["pipenv", "run", "hypercorn", "-c", "hypercorn_config.py", "src.main:app"]
