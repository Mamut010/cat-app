export type ValueOf<T> = T extends ReadonlyArray<unknown> ? T[number] : T[keyof T];

export type Type<T = any> = new (...args: any[]) => T;
