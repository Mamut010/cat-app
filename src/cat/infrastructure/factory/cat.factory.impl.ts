import { Inject } from "@nestjs/common";
import { EventPublisher } from "@nestjs/cqrs";
import { Cat, CatProperties } from "src/cat/domain/entity";
import { CatFactory, CreateCatOptions } from "src/cat/domain/factory";
import { wrapAsNestAggregate } from "src/shared/domain";

export class CatFactoryImpl implements CatFactory {
    public constructor(@Inject(EventPublisher) private readonly eventPublisher: EventPublisher) {}

    create(options: CreateCatOptions): Cat {
        const cat = new Cat({ ...options }, true);
        return wrapAsNestAggregate(this.eventPublisher, cat);
    }

    reconstitute(properties: CatProperties): Cat {
        const cat = new Cat({ ...properties }, false);
        return wrapAsNestAggregate(this.eventPublisher, cat);
    }
}
