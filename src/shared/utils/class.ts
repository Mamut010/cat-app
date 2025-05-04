export function getClassName(target: unknown): string | undefined {
    if (typeof target !== "object" || target === null) {
        return undefined;
    }
    if (Object.hasOwn(target, "constructor")) {
        return target.constructor.name;
    } else {
        return undefined;
    }
}
