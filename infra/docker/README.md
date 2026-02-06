# Fulcrum Local Infra

Services:
- Postgres: localhost:5432 (user/pass/db: fulcrum/fulcrum/fulcrum)
- Redis: localhost:6379
- RabbitMQ: localhost:5672 (user/pass: fulcrum/fulcrum)
  - UI: http://localhost:15672
- Kafka (KRaft): localhost:9092

## Start
docker compose -f infra/docker/docker-compose.yml up -d

## Stop
docker compose -f infra/docker/docker-compose.yml down

## Reset data (DANGER: deletes volumes)
docker compose -f infra/docker/docker-compose.yml down -v
