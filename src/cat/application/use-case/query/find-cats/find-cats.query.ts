import { Query } from "src/shared/cqrs";

export class FindCatsQuery implements Query {
    public constructor(
        public readonly skip?: number,
        public readonly take?: number,
    ) {}
}
