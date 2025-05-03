import { CatCreatedEvent } from "src/cat/domain";
import { DomainEventHandler, RegisterDomainEventsHandler } from "src/shared/cqrs";
import { CatCreatedIntegrationEvent, IntegrationEventPublisher, Topic } from "src/shared/integration";

@RegisterDomainEventsHandler(CatCreatedEvent)
export class CatCreatedHandler implements DomainEventHandler<CatCreatedEvent> {
    public constructor(private readonly integrationEventPublisher: IntegrationEventPublisher) {}

    async handle(event: CatCreatedEvent) {
        const integrationEvent = new CatCreatedIntegrationEvent(event.id, event.name);
        await this.integrationEventPublisher.publish(Topic.CAT_CREATED, integrationEvent);
    }
}
