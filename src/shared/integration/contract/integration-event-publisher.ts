import { IntegrationEvent } from "./integration-event";

export interface IntegrationEventPublisher {
    publish(topic: string, event: IntegrationEvent): Promise<boolean>;
}
