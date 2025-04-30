import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindCatsQuery } from "./find-cats.query";
import { CatRepository } from "src/cat/domain/repo";
import { Inject } from "@nestjs/common";
import { InjectionToken } from "../../../injection-token";
import { FindCatsResult } from "./find-cats.result";

@QueryHandler(FindCatsQuery)
export class FindCatsHandler implements IQueryHandler<FindCatsQuery, FindCatsResult> {
    public constructor(
        @Inject(InjectionToken.CAT_REPOSITORY)
        private readonly catRepo: CatRepository,
    ) {}

    async execute(query: FindCatsQuery): Promise<FindCatsResult> {
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
