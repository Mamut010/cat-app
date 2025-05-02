export type ValueOf<T> = T extends ReadonlyArray<unknown> ? T[number] : T[keyof T];

export type Class<T = any> = new (...args: any[]) => T;
