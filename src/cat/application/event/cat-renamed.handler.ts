import { CatRenamedEvent } from "src/cat/domain";
import { DomainEventHandler } from "src/shared/application/contract/domain-event-handler";
import { CatRenamedIntegrationEvent, IntegrationEventPublisher, Topic } from "src/shared/integration";

export class CatRenamedHandler implements DomainEventHandler<CatRenamedEvent> {
    public constructor(private readonly integrationEventPublisher: IntegrationEventPublisher) {}

    async handle(event: CatRenamedEvent) {
        const integrationEvent = new CatRenamedIntegrationEvent(event.id, event.oldName, event.newName);
        await this.integrationEventPublisher.publish(Topic.CAT_RENAMED, integrationEvent);
    }
}
