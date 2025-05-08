import { DomainEvent } from "./domain-event";

export interface DomainEventBus {
    publish(event: DomainEvent): Promise<void>;
    publishAll(events: DomainEvent[]): Promise<void>;
}
