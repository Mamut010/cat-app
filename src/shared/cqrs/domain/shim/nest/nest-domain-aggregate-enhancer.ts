import { EventPublisher } from "@nestjs/cqrs";
import { DomainAggregateRoot } from "../../base";
import { NestAggregateAdaptor } from "./nest-aggregate-adaptor";
import { DomainAggregateEnhancer } from "../../contract";

export class NestDomainAggregateEnhancer implements DomainAggregateEnhancer {
    public constructor(private readonly eventPublisher: EventPublisher) {}

    public enableEventPublishing<TId, TAggregate extends DomainAggregateRoot<TId, TAggregate>>(
        domainAggregate: TAggregate,
    ): TAggregate {
        let nestAdaptor = new NestAggregateAdaptor(domainAggregate);
        nestAdaptor = this.eventPublisher.mergeObjectContext(nestAdaptor);
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
