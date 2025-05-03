export abstract class DomainEntity<TId, TEntity extends DomainEntity<TId, TEntity>> {
    public abstract get id(): TId;

    public equals(entity: TEntity): boolean {
        return this.id === entity.id;
    }
}
