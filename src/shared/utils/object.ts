export function recordKeys<T extends Record<string | number | symbol, unknown>>(record: T): (keyof T)[] {
    const stringKeys = Object.keys(record);
    const symbolKeys = Object.getOwnPropertySymbols(record);

    const numberKeys = stringKeys
        .filter((k) => !Number.isNaN(Number(k)) && String(Number(k)) === k)
        .map((k) => Number(k));

    const nonNumberStringKeys = stringKeys.filter((k) => !numberKeys.includes(Number(k)));

    const allKeys = [...numberKeys, ...nonNumberStringKeys, ...symbolKeys] as (keyof T)[];

    return allKeys;
}
