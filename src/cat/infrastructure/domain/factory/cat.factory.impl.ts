import { Inject } from "@nestjs/common";
import { Cat, CatFactory, CatProperties, CreateCatOptions } from "src/cat/domain";
import { DOMAIN_AGGREGATE_ENHANCER, DomainAggregateEnhancer } from "src/shared/cqrs";

export class CatFactoryImpl implements CatFactory {
    public constructor(
        @Inject(DOMAIN_AGGREGATE_ENHANCER) private readonly enhancer: DomainAggregateEnhancer,
    ) {}

    create(options: CreateCatOptions): Cat {
        const cat = new Cat({ ...options }, true);
        return this.enhancer.enableEventPublishing(cat);
    }

    reconstitute(properties: CatProperties): Cat {
        const cat = new Cat({ ...properties }, false);
        return this.enhancer.enableEventPublishing(cat);
    }
}
