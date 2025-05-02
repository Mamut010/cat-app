export type ValueOf<T> = T extends ReadonlyArray<unknown> ? T[number] : T[keyof T];

export type Class<T = any> = new (...args: any[]) => T;

export type Constructor<T = any> = Class<T>;

export type ArrayElement<T extends readonly unknown[]> = T extends readonly (infer ElementType)[]
    ? ElementType
    : never;
