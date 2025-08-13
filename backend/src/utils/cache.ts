import NodeCache from "node-cache";

// TTL: 10 minutes (600 seconds) — you can adjust
export const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });
