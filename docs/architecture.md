# Fulcrum Architecture

Fulcrum is **not a storefront**. It’s a control plane that drives a workflow from intent → completion across multiple systems.

## Core domain vocabulary

- **FulfillmentIntent**: a request to fulfill items for a tenant/customer.
- **WorkflowRun**: a saga instance that tracks progress of an intent.
- **Reservation**: inventory hold with expiration/compensation paths.
- **PackJob**: warehouse task representing pick/pack.
- **DeliveryTask**: courier shipment/tracking unit.

## Services (initial set)

1. **Intake**  
   Accepts API requests, persists FulfillmentIntent, emits `IntentCreated`.

2. **Orchestrator**  
   Saga/state machine: decides next steps; emits commands; reacts to events.

3. **Payment**  
   Executes authorize/capture/void; emits payment events. Includes simulator.

4. **Inventory**  
   Reserves/releases stock using optimistic locking; emits inventory events.

5. **Read Model**  
   Subscribes to events and builds query-friendly projections (timeline + current state), cached in Redis.

## Messaging: Kafka vs RabbitMQ

### Kafka = immutable business facts (event stream)

Kafka topics carry **events** (things that happened). This supports:

- replay (rebuild read models)
- auditing
- analytics
- decoupled consumers

Example events:

- `IntentCreated`
- `PaymentAuthorized`
- `StockReserved`
- `DeliveryTaskCreated`

### RabbitMQ = commands / work execution

RabbitMQ carries **commands** (do this work) with:

- retries + exponential backoff
- DLQs for poison messages
- worker pool scaling

Example commands:

- `AuthorizePayment`
- `ReserveStock`
- `ReleaseStock`

## End-to-end flow (Saga)

Happy path:

1. Intake persists intent and emits `IntentCreated` (Kafka)
2. Orchestrator consumes `IntentCreated`, sends `AuthorizePayment` (RabbitMQ)
3. Payment emits `PaymentAuthorized` (Kafka)
4. Orchestrator sends `ReserveStock` (RabbitMQ)
5. Inventory emits `StockReserved` (Kafka)
6. Orchestrator marks workflow complete (v1) and read model shows final state

Compensation examples:

- Payment ok, stock fails → Orchestrator sends `VoidPayment`
- Stock reserved, payment fails later → Orchestrator sends `ReleaseStock`

## Reliability patterns

### Outbox (producer reliability)

Each service emits events using an **outbox table** written in the same DB transaction as state changes.  
A dispatcher publishes outbox rows to Kafka.

### Inbox (consumer dedupe)

Consumers store processed `event_id`s to ensure duplicate deliveries do not cause duplicate side effects.

### Idempotency (commands)

Command handlers accept an idempotency key and store the result so retries are safe.

## Observability (later phase)

- Correlation ID propagated across HTTP → RabbitMQ → Kafka
- Metrics: queue depth, consumer lag, workflow duration
- Structured logs for each step

## Why this is “microservices practice”

Fulcrum forces you to handle the real problems:

- distributed workflows without distributed transactions
- retry storms and duplicate deliveries
- eventual consistency + projections
- operational tooling (DLQs, replays, stuck workflows)
