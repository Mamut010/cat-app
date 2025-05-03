import { DomainEvent } from "../contract";
import { DomainEntity } from "./domain-entity";

export abstract class DomainAggregateRoot<
    TId,
    TAggregate extends DomainAggregateRoot<TId, TAggregate>,
> extends DomainEntity<TId, TAggregate> {
    private readonly domainEvents: DomainEvent[] = [];
    public autoCommit: boolean = false;

    public apply(event: DomainEvent): void {
        this.domainEvents.push(event);
        if (this.autoCommit) {
            this.commit();
        }
    }

    public pullEvents(): DomainEvent[] {
        const events = [...this.domainEvents];
        this.domainEvents.length = 0;
        return events;
    }

    public commit(): void {
        // No innate mechanism to commit
    }
}
