import { CatCreatedEvent, CatRenamedEvent } from "src/cat/domain";
import { DomainEventHandler } from "src/shared/application/contract/domain-event-handler";

export class CatOperationHandler implements DomainEventHandler<CatCreatedEvent | CatRenamedEvent> {
    handle(event: CatCreatedEvent | CatRenamedEvent) {
        console.log(`An operation involved cat <${event.id}> triggered`);
    }
}
