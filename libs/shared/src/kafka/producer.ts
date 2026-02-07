import type { Producer } from "kafkajs";
import type { EventEnvelope } from "../events/envelope.js";

export type KafkaProducer = {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    publish(topic: string, event: EventEnvelope<unknown>): Promise<void>;
};

export function createKafkaProducer(producer: Producer): KafkaProducer {
    return {
        async connect() {
            await producer.connect();
        },
        async disconnect() {
            await producer.disconnect();
        },
        async publish(topic, event) {
            await producer.send({
                topic,
                acks: -1,
                messages: [
                    {
                        key: event.meta.tenantId,
                        value: JSON.stringify(event),
                        headers: {
                            "x-event-id": event.meta.eventId,
                            "x-event-type": event.meta.eventType,
                            "x-correlation-id": event.meta.correlationId,
                            ...(event.meta.causationId ? { "x-causation-id": event.meta.causationId } : {}),
                        },
                    },
                ],
            });
        },
    };
}
