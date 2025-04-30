import { MiddlewareConsumer, Module, NestModule, Provider } from "@nestjs/common";
import { CatController } from "./interface/cat.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { InjectionToken } from "./injection-token";
import { CatFactoryImpl } from "./infrastructure/factory/cat.factory.impl";
import { CatRepositoryImpl } from "./infrastructure/repo/cat.repository.impl";
import { CreateCatHandler } from "./application/command/create-cat/create-cat.handler";
import { FindCatsHandler } from "./application/query/find-cats/find-cats.handler";
import { CatRenamedHandler } from "./application/event/cat-renamed.handler";
import { InMemoryCatRepositoryDal } from "./infrastructure/dal/in-memory-cat-repository-dal";
import { RenameCatHandler } from "./application/command";
import { LoggerMiddleware } from "src/shared/middleware";
import { CatCreatedHandler } from "./application/event/cat-created.handler";

const infrastructure: Provider[] = [
    {
        provide: InjectionToken.CAT_FACTORY,
        useClass: CatFactoryImpl,
    },
    {
        provide: InjectionToken.CAT_REPOSITORY,
        useClass: CatRepositoryImpl,
    },
    {
        provide: InjectionToken.CAT_REPOSITORY_DAL,
        useClass: InMemoryCatRepositoryDal,
    },
];

const application = [CreateCatHandler, RenameCatHandler, FindCatsHandler, CatCreatedHandler, CatRenamedHandler];

@Module({
    imports: [CqrsModule],
    controllers: [CatController],
    providers: [...infrastructure, ...application],
})
export class CatModule implements NestModule {
    async configure(consumer: MiddlewareConsumer): Promise<void> {
        consumer.apply(LoggerMiddleware).forRoutes(CatController);

        await Promise.resolve();
    }
}
