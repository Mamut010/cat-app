import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CatCreatedEvent } from "src/cat/domain/event";
import {
    CatCreatedIntegrationEvent,
    INTEGRATION_EVENT_PUBLISHER,
    IntegrationEventPublisher,
    Topic,
} from "src/shared/integration";

@EventsHandler(CatCreatedEvent)
export class CatCreatedHandler implements IEventHandler<CatCreatedEvent> {
    public constructor(
        @Inject(INTEGRATION_EVENT_PUBLISHER)
        private readonly integrationEventPublisher: IntegrationEventPublisher,
    ) {}

    async handle(event: CatCreatedEvent) {
        const integrationEvent = new CatCreatedIntegrationEvent(event.id, event.name);
        await this.integrationEventPublisher.publish(Topic.CAT_CREATED, integrationEvent);
    }
}
