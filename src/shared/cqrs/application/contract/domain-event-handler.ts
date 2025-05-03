import { DomainEvent } from "src/shared/cqrs";

export interface DomainEventHandler<TEvent extends DomainEvent> {
    handle(event: TEvent): any;
}
