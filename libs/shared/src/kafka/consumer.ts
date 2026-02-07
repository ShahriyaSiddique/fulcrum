import type { Consumer } from "kafkajs";
import type { EventEnvelope } from "../events/envelope.js";

export type KafkaMessageHandler = (event: EventEnvelope<any>) => Promise<void>;

export type KafkaConsumer = {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    subscribe(topic: string): Promise<void>;
    run(handler: KafkaMessageHandler): Promise<void>;
};

export function createKafkaConsumer(consumer: Consumer): KafkaConsumer {
    return {
        async connect() {
            await consumer.connect();
        },
        async disconnect() {
            await consumer.disconnect();
        },
        async subscribe(topic: string) {
            await consumer.subscribe({ topic, fromBeginning: false });
        },
        async run(handler: KafkaMessageHandler) {
            await consumer.run({
                eachMessage: async ({ message }) => {
                    if (!message.value) return;
                    const raw = message.value.toString("utf8");
                    const event = JSON.parse(raw) as EventEnvelope<any>;
                    await handler(event);
                },
            });
        },
    };
}
