import { Inject } from "@nestjs/common";
import { EventPublisher } from "@nestjs/cqrs";
import { Cat, CatFactory, CatProperties, CreateCatOptions } from "src/cat/domain";
import { DOMAIN_AGGREGATE_MERGER, DomainAggregateMerger } from "src/shared/cqrs";

export class CatFactoryImpl implements CatFactory {
    public constructor(
        @Inject(EventPublisher) private readonly eventPublisher: EventPublisher,
        @Inject(DOMAIN_AGGREGATE_MERGER) private readonly merger: DomainAggregateMerger,
    ) {}

    create(options: CreateCatOptions): Cat {
        const cat = new Cat({ ...options }, true);
        return this.merger.mergeNestEventPublisher(this.eventPublisher, cat);
    }

    reconstitute(properties: CatProperties): Cat {
        const cat = new Cat({ ...properties }, false);
        return this.merger.mergeNestEventPublisher(this.eventPublisher, cat);
    }
}
