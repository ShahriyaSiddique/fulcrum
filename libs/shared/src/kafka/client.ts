import { Kafka, logLevel } from "kafkajs";

export type KafkaClientConfig = {
    clientId: string;
    brokers: string[];
};

export function createKafka({ clientId, brokers }: KafkaClientConfig) {
    return new Kafka({
        clientId,
        brokers,
        logLevel: logLevel.NOTHING,
    });
}
