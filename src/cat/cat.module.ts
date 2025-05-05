import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CatController } from "./interface/cat.controller";
import { LoggerMiddleware } from "src/shared/middleware";
import { infrastructureProviders } from "./providers/infrastructure";
import { applicationProviders } from "./providers/application";
import { CqrsModule } from "src/shared/cqrs";

@Module({
    imports: [CqrsModule],
    controllers: [CatController],
    providers: [...infrastructureProviders, ...applicationProviders],
})
export class CatModule implements NestModule {
    configure(consumer: MiddlewareConsumer): Promise<void> {
        consumer.apply(LoggerMiddleware).forRoutes(CatController);

        return Promise.resolve();
    }
}
