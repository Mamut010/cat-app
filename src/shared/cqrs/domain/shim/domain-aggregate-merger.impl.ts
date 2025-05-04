import { EventPublisher } from "@nestjs/cqrs";
import { DomainAggregateRoot } from "../base";
import { NestAggregateAdaptor } from "./nest-aggregate-adaptor";
import { DomainAggregateMerger } from "../contract/domain-aggregate-merger";

export class DomainAggregateMergerImpl implements DomainAggregateMerger {
    public mergeNestEventPublisher<TId, TAggregate extends DomainAggregateRoot<TId, TAggregate>>(
        eventPublisher: EventPublisher,
        domainAggregate: TAggregate,
    ): TAggregate {
        let nestAdaptor = new NestAggregateAdaptor(domainAggregate);
        nestAdaptor = eventPublisher.mergeObjectContext(nestAdaptor);
        domainAggregate = nestAdaptor.instance;
        return new Proxy(domainAggregate, {
            get(target, prop, receiver) {
                if (prop === "commit") {
                    return () => nestAdaptor.commit();
                }
                return Reflect.get(target, prop, receiver);
            },
        });
    }
}
