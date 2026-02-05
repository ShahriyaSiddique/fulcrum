# Fulcrum

Fulcrum is an event-driven orchestration platform for distributed fulfillment workflows.
It coordinates long-running processes across independent services (payments, inventory, warehousing, delivery)
while remaining correct under retries, duplicate events, partial failures, and eventual consistency.

## Repo layout

- `apps/` — microservices (Intake, Orchestrator, Payment, Inventory, Read Model)
- `libs/` — shared libraries (logging, event envelope, messaging wrappers, outbox/inbox)
- `infra/` — local infrastructure (docker compose, config)
- `docs/` — architecture notes and demos

## Status

Scaffolding in progress.
