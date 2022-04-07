export type ValueTypeOf<T> = T extends { [key: string]: infer R } ? R : never;
