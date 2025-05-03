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
    CatOperationHandler,
} from "../application";
import { HandlerProvider } from "src/shared/cqrs";
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
    ...HandlerProvider.commands([CreateCatCommand, CreateCatUseCase], [RenameCatCommand, RenameCatUseCase]),
    ...HandlerProvider.queries([FindCatsQuery, FindCatsUseCase]),
    ...HandlerProvider.events(
        [CatCreatedEvent, CatCreatedHandler],
        [CatRenamedEvent, CatRenamedHandler],
        [[CatCreatedEvent, CatRenamedEvent], CatOperationHandler],
    ),
];

export const infrastructureProviders: Provider[] = [...injectionTokenProviders, ...handlerProviders];
