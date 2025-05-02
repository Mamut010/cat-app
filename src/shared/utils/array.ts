export function asArray<T, U = T extends any[] ? T : T[]>(value: T): U {
    return (Array.isArray(value) ? value : [value]) as U;
}
