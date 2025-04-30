import { EventPublisher, AggregateRoot as NestAggregateRoot } from "@nestjs/cqrs";
import { DomainAggregateRoot } from "../base";
import { NestAggregateWrapper } from "./nest-aggregate-wrapper";

export function wrapAsAggregate<TId, TAggregate extends DomainAggregateRoot<TId, TAggregate>>(
    domainAggregate: TAggregate,
): TAggregate & NestAggregateRoot {
    const root = new (class extends NestAggregateRoot {})();

    return new Proxy(domainAggregate, {
        get(target, prop, receiver) {
            if (prop === "commit") {
                return () => {
                    const events = domainAggregate.pullEvents();
                    for (const event of events) {
                        root.apply(event);
                    }
                    root.commit();
                };
            }

            return Reflect.get(target, prop, receiver);
        },
    }) as TAggregate & NestAggregateRoot;
}

export function wrapAsNestAggregate<TId, TAggregate extends DomainAggregateRoot<TId, TAggregate>>(
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
