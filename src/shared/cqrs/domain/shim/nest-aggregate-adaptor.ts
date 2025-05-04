import { AggregateRoot as NestAggregateRoot } from "@nestjs/cqrs";
import { DomainAggregateRoot } from "../base";

export class NestAggregateAdaptor<
    TId,
    TAggregate extends DomainAggregateRoot<TId, TAggregate>,
> extends NestAggregateRoot {
    constructor(private readonly aggregate: TAggregate) {
        super();
    }

    public get instance(): TAggregate {
        return this.aggregate;
    }

    public commit(): void {
        const domainEvents = this.aggregate.pullEvents();
        domainEvents.forEach((event) => this.apply(event));
        super.commit(); // triggers NestJS event handlers
    }
}
