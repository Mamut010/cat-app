import { DomainEvent } from "src/shared/domain";

export interface DomainEventHandler<TEvent extends DomainEvent> {
    handle(event: TEvent): any;
}
