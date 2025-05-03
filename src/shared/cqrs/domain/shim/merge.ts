import { EventPublisher } from "@nestjs/cqrs";
import { DomainAggregateRoot } from "../base";
import { NestAggregateWrapper } from "./nest-aggregate-wrapper";

export function mergeNestEventPublisher<TId, TAggregate extends DomainAggregateRoot<TId, TAggregate>>(
    eventPublisher: EventPublisher,
    domainAggregate: TAggregate,
): TAggregate {
    let nestWrapper = new NestAggregateWrapper(domainAggregate);
    nestWrapper = eventPublisher.mergeObjectContext(nestWrapper);
    domainAggregate = nestWrapper.unwrap();
    return new Proxy(domainAggregate, {
        get(target, prop, receiver) {
            if (prop === "commit") {
                return () => nestWrapper.commit();
            }
            return Reflect.get(target, prop, receiver);
        },
    });
}
