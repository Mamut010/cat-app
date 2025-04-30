import { Cat } from "../entity";

export interface CatRepository {
    newId(): Promise<number>;
    save(cat: Cat | Cat[]): Promise<void>;
    findAll(skip?: number, take?: number): Promise<Cat[]>;
    findById(id: number): Promise<Cat | null>;
}
