import { Cat, CatProperties } from "../entity/cat";

export type CreateCatOptions = Readonly<{
    id: number;
    name: string;
    hairColor: string;
    kind: string | null;
}>;

export interface CatFactory {
    create(options: CreateCatOptions): Cat;
    reconstitute(properties: CatProperties): Cat;
}
