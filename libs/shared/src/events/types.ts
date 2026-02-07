export const EventTypes = {
    IntentCreated: "fulcrum.intent.created.v1",
    PaymentAuthorized: "fulcrum.payment.authorized.v1",
    PaymentFailed: "fulcrum.payment.failed.v1",
    StockReserved: "fulcrum.inventory.reserved.v1",
    StockReservationFailed: "fulcrum.inventory.reserve_failed.v1",
} as const;

export type EventType = (typeof EventTypes)[keyof typeof EventTypes];
