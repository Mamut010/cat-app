export type ValueOf<T> = T extends ReadonlyArray<unknown> ? T[number] : T[keyof T];
