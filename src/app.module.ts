import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CatModule } from "./cat/cat.module";
import { NotificationModule } from "./notification/notification.module";
import { IntegrationModule } from "./shared/integration";

@Module({
    imports: [IntegrationModule, CatModule, NotificationModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
