import { randomUUID } from "crypto";

export const CORRELATION_ID_HEADER = "x-correlation-id";

export function generateCorrelationId(): string {
    return randomUUID();
}
