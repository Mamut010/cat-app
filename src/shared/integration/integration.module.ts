import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { Global, Module } from "@nestjs/common";
import { IntegrationConfig } from "./config";
import { RabbitMqIntegrationEventPublisher } from "./event-publisher";
import { INTEGRATION_EVENT_PUBLISHER } from "./injection-token";

@Global()
@Module({
    imports: [
        RabbitMQModule.forRoot({
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
        }),
    ],
    providers: [
        {
            provide: INTEGRATION_EVENT_PUBLISHER,
            useClass: RabbitMqIntegrationEventPublisher,
        },
    ],
    exports: [INTEGRATION_EVENT_PUBLISHER],
})
export class IntegrationModule {}
