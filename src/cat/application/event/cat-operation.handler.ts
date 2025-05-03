import { CatCreatedEvent, CatRenamedEvent } from "src/cat/domain";
import { DomainEventHandler, RegisterDomainEventsHandler } from "src/shared/cqrs";

@RegisterDomainEventsHandler(CatCreatedEvent, CatRenamedEvent)
export class CatOperationHandler implements DomainEventHandler<CatCreatedEvent | CatRenamedEvent> {
    handle(event: CatCreatedEvent | CatRenamedEvent) {
        console.log(`An operation involved cat <${event.id}> triggered`);
    }
}
