import { CatRenamedEvent } from "src/cat/domain";
import { DomainEventHandler, RegisterDomainEventsHandler } from "src/shared/cqrs";
import { CatRenamedIntegrationEvent, IntegrationEventPublisher, Topic } from "src/shared/integration";

@RegisterDomainEventsHandler(CatRenamedEvent)
export class CatRenamedHandler implements DomainEventHandler<CatRenamedEvent> {
    public constructor(private readonly integrationEventPublisher: IntegrationEventPublisher) {}

    async handle(event: CatRenamedEvent) {
        const integrationEvent = new CatRenamedIntegrationEvent(event.id, event.oldName, event.newName);
        await this.integrationEventPublisher.publish(Topic.CAT_RENAMED, integrationEvent);
    }
}
