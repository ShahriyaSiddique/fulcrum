import { randomUUID } from "crypto";

export type EventMeta = {
    eventId: string;
    eventType: string;
    eventVersion: number;

    occurredAt: string; // ISO timestamp
    producer: string;   // service name

    tenantId: string;

    correlationId: string;
    causationId?: string; // prior eventId or commandId

    trace?: {
        workflowRunId?: string;
        intentId?: string;
    };
};

export type EventEnvelope<TPayload> = {
    meta: EventMeta;
    payload: TPayload;
};

export type NewEventArgs<TPayload> = {
    eventType: string;
    eventVersion?: number;
    producer: string;
    tenantId: string;

    correlationId: string;
    causationId?: string;

    trace?: EventMeta["trace"];
    payload: TPayload;
};

export function createEvent<TPayload>(args: NewEventArgs<TPayload>): EventEnvelope<TPayload> {
    return {
        meta: {
            eventId: randomUUID(),
            eventType: args.eventType,
            eventVersion: args.eventVersion ?? 1,
            occurredAt: new Date().toISOString(),
            producer: args.producer,
            tenantId: args.tenantId,
            correlationId: args.correlationId,
            causationId: args.causationId,
            trace: args.trace,
        },
        payload: args.payload,
    };
}
