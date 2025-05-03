export class ValueObject<TVo extends ValueObject<TVo>> {
    public equals(other: TVo): boolean {
        return JSON.stringify(this) === JSON.stringify(other);
    }
}
