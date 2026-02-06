# Fulcrum

Fulcrum is a **distributed workflow orchestration platform** for fulfillment-like processes.
It coordinates long-running work across independent services (payment, inventory, warehouse, delivery)
and stays correct under **retries, duplicates, partial failures, and eventual consistency**.

This repository is intentionally built as microservices to practice:

- Saga orchestration
- Outbox + Inbox patterns
- Idempotency + deduplication
- Retry/DLQ handling
- Read models and caching

## Repo layout

- `apps/` — microservices
  - `intake/` — request intake (creates FulfillmentIntents)
  - `orchestrator/` — saga engine (workflow state machine)
  - `payment/` — payment adapter + simulator
  - `inventory/` — reservations + oversell prevention
  - `readmodel/` — projections for fast queries + timeline UI
- `libs/` — shared libraries (contracts, messaging, observability, outbox/inbox)
- `infra/` — local infrastructure (docker compose)
- `docs/` — architecture + demos

## Docs

- `docs/architecture.md` — system design and event flow
- `docs/local-dev.md` — run infra locally
