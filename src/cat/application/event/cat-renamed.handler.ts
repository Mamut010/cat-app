import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CatRenamedEvent } from "src/cat/domain/event";
import {
    CatRenamedIntegrationEvent,
    INTEGRATION_EVENT_PUBLISHER,
    IntegrationEventPublisher,
    Topic,
} from "src/shared/integration";

@EventsHandler(CatRenamedEvent)
export class CatRenamedHandler implements IEventHandler<CatRenamedEvent> {
    public constructor(
        @Inject(INTEGRATION_EVENT_PUBLISHER)
        private readonly integrationEventPublisher: IntegrationEventPublisher,
    ) {}

    async handle(event: CatRenamedEvent) {
        const integrationEvent = new CatRenamedIntegrationEvent(event.id, event.oldName, event.newName);
        await this.integrationEventPublisher.publish(Topic.CAT_RENAMED, integrationEvent);
    }
}
