import { Cat } from "src/cat/domain/entity";
import { CatRepository } from "src/cat/domain/repo";
import { CatRepositoryDal } from "../dal/cat-repository-dal";
import { Inject } from "@nestjs/common";
import { CatModel } from "../model/cat.model";
import { CatFactory } from "src/cat/domain/factory";
import { InjectionToken } from "src/cat/injection-token";

export class CatRepositoryImpl implements CatRepository {
    public constructor(
        @Inject(InjectionToken.CAT_REPOSITORY_DAL) private readonly repo: CatRepositoryDal,
        @Inject(InjectionToken.CAT_FACTORY) private readonly catFactory: CatFactory,
    ) {}

    public async newId(): Promise<number> {
        const count = await this.repo.count();
        return count + 1;
    }

    public async save(cat: Cat | Cat[]): Promise<void> {
        const catEntities = Array.isArray(cat) ? cat : [cat];
        const cats = catEntities.map((entity) => this.entityToModel(entity));
        await this.repo.save(cats);
    }

    public async findAll(skip?: number, take?: number): Promise<Cat[]> {
        const cats = await this.repo.findAll(skip, take);
        return cats.map((cat) => this.modelToEntity(cat));
    }

    public async findById(id: number): Promise<Cat | null> {
        const cat = await this.repo.findOneById(id);
        return cat ? this.modelToEntity(cat) : null;
    }

    private modelToEntity(model: CatModel): Cat {
        return this.catFactory.reconstitute({
            ...model,
        });
    }

    private entityToModel(entity: Cat): CatModel {
        return {
            id: entity.id,
            name: entity.name,
            hairColor: entity.hairColor,
            kind: entity.kind,
        };
    }
}
