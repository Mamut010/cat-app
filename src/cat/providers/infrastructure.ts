import { Provider } from "@nestjs/common";
import { InjectionToken } from "../injection-token";
import { CatFactoryImpl, CatRepositoryImpl } from "../infrastructure/domain";
import { InMemoryCatModelRepository } from "../infrastructure/persistence";
import {
    CatCreatedHandler,
    CatRenamedHandler,
    CreateCatCommand,
    CreateCatUseCase,
    FindCatsQuery,
    FindCatsUseCase,
    RenameCatCommand,
    RenameCatUseCase,
} from "../application";
import {
    registerCommandHandlers,
    registerEventHandlers,
    registerQueryHandlers,
} from "src/shared/application";
import { CatCreatedEvent, CatRenamedEvent } from "../domain";

const injectionTokenProviders: Provider[] = [
    {
        provide: InjectionToken.CAT_FACTORY,
        useClass: CatFactoryImpl,
    },
    {
        provide: InjectionToken.CAT_REPOSITORY,
        useClass: CatRepositoryImpl,
    },
    {
        provide: InjectionToken.CAT_MODEL_REPOSITORY,
        useClass: InMemoryCatModelRepository,
    },
];

const handlerProviders: Provider[] = [
    ...registerCommandHandlers([
        [CreateCatCommand, CreateCatUseCase],
        [RenameCatCommand, RenameCatUseCase],
    ]),
    ...registerQueryHandlers([[FindCatsQuery, FindCatsUseCase]]),
    ...registerEventHandlers([
        [CatCreatedEvent, CatCreatedHandler],
        [CatRenamedEvent, CatRenamedHandler],
    ]),
];

export const infrastructureProviders: Provider[] = [...injectionTokenProviders, ...handlerProviders];
