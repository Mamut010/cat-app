import { FactoryProvider } from "@nestjs/common";
import {
    CatCreatedHandler,
    CatOperationHandler,
    CatRenamedHandler,
    CreateCatUseCase,
    FindCatsUseCase,
    RenameCatUseCase,
} from "../application";
import { CatFactory, CatRepository } from "../domain";
import { InjectionToken } from "../injection-token";
import { INTEGRATION_EVENT_PUBLISHER, IntegrationEventPublisher } from "src/shared/integration";
import { HandlerProvider } from "src/shared/cqrs";
import { Type } from "src/shared/utils/type";

const useCaseProviders: FactoryProvider[] = [
    {
        provide: CreateCatUseCase,
        useFactory: (factory: CatFactory, repo: CatRepository) => {
            return new CreateCatUseCase(factory, repo);
        },
        inject: [InjectionToken.CAT_FACTORY, InjectionToken.CAT_REPOSITORY],
    },
    {
        provide: RenameCatUseCase,
        useFactory: (repo: CatRepository) => new RenameCatUseCase(repo),
        inject: [InjectionToken.CAT_REPOSITORY],
    },
    {
        provide: FindCatsUseCase,
        useFactory: (repo: CatRepository) => new FindCatsUseCase(repo),
        inject: [InjectionToken.CAT_REPOSITORY],
    },
];

const domainEventsHandlerProviders: FactoryProvider[] = [
    {
        provide: CatCreatedHandler,
        useFactory: (publisher: IntegrationEventPublisher) => new CatCreatedHandler(publisher),
        inject: [INTEGRATION_EVENT_PUBLISHER],
    },
    {
        provide: CatRenamedHandler,
        useFactory: (publisher: IntegrationEventPublisher) => new CatRenamedHandler(publisher),
        inject: [INTEGRATION_EVENT_PUBLISHER],
    },
    {
        provide: CatOperationHandler,
        useFactory: () => new CatOperationHandler(),
    },
];

const autoHandlerProviders = HandlerProvider.fromDecorated(
    ...useCaseProviders.map((provider) => provider.provide as Type),
    ...domainEventsHandlerProviders.map((provider) => provider.provide as Type),
);

export const applicationProviders = [
    ...useCaseProviders,
    ...domainEventsHandlerProviders,
    ...autoHandlerProviders,
];
