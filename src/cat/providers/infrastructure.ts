import { Provider } from "@nestjs/common";
import { InjectionToken } from "../injection-token";
import { CatFactoryImpl, CatRepositoryImpl } from "../infrastructure/domain";
import { InMemoryCatModelRepository } from "../infrastructure/persistence";

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

export const infrastructureProviders: Provider[] = injectionTokenProviders;
