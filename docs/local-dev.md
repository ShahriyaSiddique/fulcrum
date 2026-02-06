# Local Development

## Prereqs

- Docker + Docker Compose
- Git

## Start infrastructure

``` bash
docker compose -f infra/docker/docker-compose.yml up -d
docker compose -f infra/docker/docker-compose.yml ps
```

## Stop

``` bash
docker compose -f infra/docker/docker-compose.yml down
```

## Reset (deletes volumes)

``` bash
docker compose -f infra/docker/docker-compose.yml down -v
```

## Useful checks

### Postgres

``` bash
docker exec -it fulcrum-postgres psql -U fulcrum -d fulcrum -c "select 1;"
```

### Redis

``` bash
docker exec -it fulcrum-redis redis-cli ping
```

### RabbitMQ

- UI: <http://localhost:15672> (fulcrum / fulcrum)

### Kafka (CLI inside container)

``` bash
docker exec -it fulcrum-kafka bash -lc "/opt/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --list"
```
