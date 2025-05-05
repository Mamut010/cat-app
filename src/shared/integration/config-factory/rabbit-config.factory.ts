import { Injectable } from "@nestjs/common";
import { IntegrationEventHandlerExplorer } from "../support/integration-event-handler-explorer";
import { RabbitMQConfig, RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { IntegrationConfig } from "../config";
import { recordKeys } from "src/shared/utils/object";

@Injectable()
export class RabbitConfigFactory {
    public constructor(private readonly explorer: IntegrationEventHandlerExplorer) {}

    public create(): RabbitMQConfig {
        this.initRabbitSubscribe();
        return {
            exchanges: [
                {
                    name: IntegrationConfig.INTEGRATION_EVENT_EXCHANGE,
                    type: "topic",
                },
            ],
            uri: IntegrationConfig.URI,
            connectionInitOptions: {
                wait: false,
            },
            enableControllerDiscovery: true,
        };
    }

    private initRabbitSubscribe() {
        for (const { target, metadata } of this.explorer.getIntegrationEventHandlerMetadata()) {
            for (const propertyKey of recordKeys(metadata)) {
                const { descriptor, queue, topic } = metadata[propertyKey];
                RabbitSubscribe({
                    exchange: IntegrationConfig.INTEGRATION_EVENT_EXCHANGE,
                    routingKey: topic,
                    queue,
                })(target, propertyKey, descriptor);
            }
        }
    }
}
