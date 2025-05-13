import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CatModule } from "./cat/cat.module";
import { IntegrationModule } from "./shared/integration";
import { ErrorModule } from "./shared/error";

@Module({
    imports: [IntegrationModule, ErrorModule, CatModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
