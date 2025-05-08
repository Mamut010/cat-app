import { EventBus } from "@nestjs/cqrs";
import { DomainEvent, DomainEventBus } from "../../contract";

export class NestDomainEventBus implements DomainEventBus {
    public constructor(private readonly eventBus: EventBus) {}

    public async publish(event: DomainEvent): Promise<void> {
        await this.eventBus.publish(event);
    }

    public async publishAll(events: DomainEvent[]): Promise<void> {
        await this.eventBus.publishAll(events);
    }
}
