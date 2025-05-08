import { DomainAggregateRoot } from "../base";

export interface DomainAggregateEnhancer {
    enableEventPublishing<TId, TAggregate extends DomainAggregateRoot<TId, TAggregate>>(
        domainAggregate: TAggregate,
    ): TAggregate;
}
