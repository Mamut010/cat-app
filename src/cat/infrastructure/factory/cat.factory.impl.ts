import { Inject } from "@nestjs/common";
import { EventPublisher } from "@nestjs/cqrs";
import { Cat, CatImpl, CatProperties } from "src/cat/domain/entity";
import { CatFactory, CreateCatOptions } from "src/cat/domain/factory";

export class CatFactoryImpl implements CatFactory {
    public constructor(@Inject(EventPublisher) private readonly eventPublisher: EventPublisher) {}

    create(options: CreateCatOptions): Cat {
        const cat = new CatImpl({ ...options });
        return this.eventPublisher.mergeObjectContext(cat);
    }
    reconstitute(properties: CatProperties): Cat {
        const cat = new CatImpl({ ...properties });
        return this.eventPublisher.mergeObjectContext(cat);
    }
}
