import { Type } from "./type";

export function isConstructor(input: unknown): input is Type {
    if (typeof input !== "function" || input.prototype) {
        return false;
    }
    const prototype = input.prototype as unknown;
    if (prototype && typeof prototype === "object" && "constructor" in prototype) {
        return prototype.constructor === input;
    } else {
        return false;
    }
}
