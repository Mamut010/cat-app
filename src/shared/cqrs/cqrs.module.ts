import { Module } from "@nestjs/common";
import { EventBus, EventPublisher, CqrsModule as NestCqrsModule } from "@nestjs/cqrs";
import { DOMAIN_AGGREGATE_ENHANCER, DOMAIN_EVENT_BUS } from "./injection-token";
import { NestDomainAggregateEnhancer, NestDomainEventBus } from "./domain/shim/nest";

@Module({
    imports: [NestCqrsModule],
    providers: [
        {
            provide: DOMAIN_AGGREGATE_ENHANCER,
            useFactory: (eventPublisher: EventPublisher) => {
                return new NestDomainAggregateEnhancer(eventPublisher);
            },
            inject: [EventPublisher],
        },
        {
            provide: DOMAIN_EVENT_BUS,
            useFactory: (eventBus: EventBus) => {
                return new NestDomainEventBus(eventBus);
            },
            inject: [EventBus],
        },
    ],
    exports: [NestCqrsModule, DOMAIN_AGGREGATE_ENHANCER, DOMAIN_EVENT_BUS],
})
export class CqrsModule {}
