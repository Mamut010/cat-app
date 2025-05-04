import { EventPublisher } from "@nestjs/cqrs";
import { DomainAggregateRoot } from "../base";

export interface DomainAggregateMerger {
    mergeNestEventPublisher<TId, TAggregate extends DomainAggregateRoot<TId, TAggregate>>(
        eventPublisher: EventPublisher,
        domainAggregate: TAggregate,
    ): TAggregate;
}
