import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CatController } from "./interface/cat.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { LoggerMiddleware } from "src/shared/middleware";
import { infrastructureProviders } from "./providers/infrastructure";
import { applicationProviders } from "./providers/application";

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
