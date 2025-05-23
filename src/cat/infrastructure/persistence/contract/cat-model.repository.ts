import { CatModel } from "../model/cat.model";

export interface CatModelRepository {
    findAll(skip?: number, take?: number): Promise<CatModel[]>;
    findOneById(id: number): Promise<CatModel | null>;
    count(): Promise<number>;
    save(cat: CatModel | CatModel[]): Promise<void>;
}
