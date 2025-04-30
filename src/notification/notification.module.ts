import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { NotificationIntegrationController } from "./interface/notification-integration.controller";

@Module({
    imports: [CqrsModule],
    controllers: [NotificationIntegrationController],
})
export class NotificationModule {}
