import { CORRELATION_ID_HEADER, generateCorrelationId } from "../correlation.js";

export function correlationMiddleware(req: any, res: any, next: any) {
    const incoming =
        req.headers[CORRELATION_ID_HEADER] ||
        req.headers[CORRELATION_ID_HEADER.toLowerCase()];

    const correlationId = incoming || generateCorrelationId();

    req.correlationId = correlationId;
    res.setHeader(CORRELATION_ID_HEADER, correlationId);

    next();
}
