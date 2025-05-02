import { Provider } from "@nestjs/common";
import {
    CatCreatedHandler,
    CatRenamedHandler,
    CreateCatUseCase,
    FindCatsUseCase,
    RenameCatUseCase,
} from "../application";
import { CatFactory, CatRepository } from "../domain";
import { InjectionToken } from "../injection-token";
import { INTEGRATION_EVENT_PUBLISHER, IntegrationEventPublisher } from "src/shared/integration";

const useCaseProviders: Provider[] = [
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
];

export const applicationProviders: Provider[] = useCaseProviders;
