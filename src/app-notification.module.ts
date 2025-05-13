import { Module } from "@nestjs/common";
import { NotificationModule } from "./notification/notification.module";
import { IntegrationModule } from "./shared/integration";
import { ErrorModule } from "./shared/error";

@Module({ imports: [IntegrationModule, ErrorModule, NotificationModule] })
export class AppModule {}
