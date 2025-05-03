import { Inject } from "@nestjs/common";
import { EventPublisher } from "@nestjs/cqrs";
import { Cat, CatFactory, CatProperties, CreateCatOptions } from "src/cat/domain";
import { mergeNestEventPublisher } from "src/shared/cqrs";

export class CatFactoryImpl implements CatFactory {
    public constructor(@Inject(EventPublisher) private readonly eventPublisher: EventPublisher) {}

    create(options: CreateCatOptions): Cat {
        const cat = new Cat({ ...options }, true);
        return mergeNestEventPublisher(this.eventPublisher, cat);
    }

    reconstitute(properties: CatProperties): Cat {
        const cat = new Cat({ ...properties }, false);
        return mergeNestEventPublisher(this.eventPublisher, cat);
    }
}
