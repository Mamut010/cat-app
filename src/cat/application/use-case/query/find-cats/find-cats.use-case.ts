import { FindCatsQuery } from "./find-cats.query";
import { CatRepository } from "src/cat/domain";
import { FindCatsResult } from "./find-cats.result";
import { QueryUseCase } from "src/shared/cqrs";

export class FindCatsUseCase implements QueryUseCase<FindCatsQuery, FindCatsResult> {
    public constructor(private readonly catRepo: CatRepository) {}

    public async execute(query: FindCatsQuery): Promise<FindCatsResult> {
        const { skip, take } = query;
        const cats = await this.catRepo.findAll(skip, take);
        const findCatsResult = new FindCatsResult(
            cats.map((cat) => {
                return {
                    id: cat.id,
                    name: cat.name,
                    hairColor: cat.hairColor,
                    kind: cat.kind,
                };
            }),
        );
        return findCatsResult;
    }
}
