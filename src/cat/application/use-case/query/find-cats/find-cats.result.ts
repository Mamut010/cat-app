import { IQueryResult } from "@nestjs/cqrs";

export class FindCatsResult implements IQueryResult {
    public constructor(
        public readonly cats: ReadonlyArray<{
            id: number;
            name: string;
            hairColor: string;
            kind: string | null;
        }>,
    ) {}
}
