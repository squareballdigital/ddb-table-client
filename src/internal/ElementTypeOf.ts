export type ElementTypeOf<T> = T extends Array<infer R> ? R : never;
