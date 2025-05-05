import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { Global, Module } from "@nestjs/common";
import { RabbitMqIntegrationEventPublisher } from "./event-publisher/rabbitmq";
import { INTEGRATION_EVENT_PUBLISHER } from "./injection-token";
import { DiscoveryModule } from "@nestjs/core";
import { RabbitConfigFactory } from "./config-factory/rabbit-config.factory";
import { IntegrationEventHandlerExplorer } from "./support/integration-event-handler-explorer";

@Global()
@Module({
    imports: [
        DiscoveryModule,
        RabbitMQModule.forRootAsync({
            useClass: RabbitConfigFactory,
        }),
    ],
    providers: [
        IntegrationEventHandlerExplorer,
        {
            provide: INTEGRATION_EVENT_PUBLISHER,
            useClass: RabbitMqIntegrationEventPublisher,
        },
    ],
    exports: [IntegrationEventHandlerExplorer, INTEGRATION_EVENT_PUBLISHER],
})
export class IntegrationModule {}
