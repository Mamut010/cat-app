import { CatModel } from "../model/cat.model";
import { CatRepositoryDal } from "./cat-repository-dal";

export class InMemoryCatRepositoryDal implements CatRepositoryDal {
    private readonly cats = new Map<number, CatModel>();

    public findAll(skip?: number, take?: number): Promise<CatModel[]> {
        skip ??= 0;
        take ??= 1;
        const takenCats: CatModel[] = [];
        for (const cat of this.cats.values()) {
            if (skip > 0) {
                skip--;
                continue;
            }
            if (takenCats.length >= take) {
                break;
            }
            takenCats.push(cat);
        }
        return Promise.resolve(takenCats);
    }

    public findOneById(id: number): Promise<CatModel | null> {
        const cat = this.cats.get(id);
        return Promise.resolve(cat ?? null);
    }

    public count(): Promise<number> {
        return Promise.resolve(this.cats.size);
    }

    public save(cat: CatModel | CatModel[]): Promise<void> {
        const cats = Array.isArray(cat) ? cat : [cat];
        cats.forEach((cat) => this.cats.set(cat.id, cat));
        return Promise.resolve();
    }
}
