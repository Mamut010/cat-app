import { AggregateRoot as NestAggregateRoot } from "@nestjs/cqrs";
import { DomainAggregateRoot } from "../base";

export class NestAggregateWrapper<
    TId,
    TAggregate extends DomainAggregateRoot<TId, TAggregate>,
> extends NestAggregateRoot {
    constructor(private readonly aggregate: TAggregate) {
        super();
    }

    public commit(): void {
        const domainEvents = this.aggregate.pullEvents();
        domainEvents.forEach((event) => this.apply(event));
        super.commit(); // triggers NestJS event handlers
    }

    public unwrap(): TAggregate {
        return this.aggregate;
    }
}
