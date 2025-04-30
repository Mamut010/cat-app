export class ValueObject {
    public equals(other: unknown): boolean {
        if (other === this) {
            return true;
        } else if (!(other instanceof ValueObject)) {
            return false;
        } else {
            return JSON.stringify(this) === JSON.stringify(other);
        }
    }
}
