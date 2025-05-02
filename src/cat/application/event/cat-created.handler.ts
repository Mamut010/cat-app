import { CatCreatedEvent } from "src/cat/domain";
import { DomainEventHandler } from "src/shared/application/contract/domain-event-handler";
import { CatCreatedIntegrationEvent, IntegrationEventPublisher, Topic } from "src/shared/integration";

export class CatCreatedHandler implements DomainEventHandler<CatCreatedEvent> {
    public constructor(private readonly integrationEventPublisher: IntegrationEventPublisher) {}

    async handle(event: CatCreatedEvent) {
        const integrationEvent = new CatCreatedIntegrationEvent(event.id, event.name);
        await this.integrationEventPublisher.publish(Topic.CAT_CREATED, integrationEvent);
    }
}
