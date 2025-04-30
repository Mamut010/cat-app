import { Injectable } from "@nestjs/common";
import { IntegrationEventPublisher } from "../integration-event-publisher";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { IntegrationEvent } from "../integration-event";
import { IntegrationConfig } from "../config";

@Injectable()
export class RabbitMqIntegrationEventPublisher implements IntegrationEventPublisher {
    public constructor(private readonly amqpConnection: AmqpConnection) {}

    async publish(topic: string, event: IntegrationEvent): Promise<boolean> {
        const exchange = IntegrationConfig.INTEGRATION_EVENT_EXCHANGE;
        return await this.amqpConnection.publish(exchange, topic, event);
    }
}
