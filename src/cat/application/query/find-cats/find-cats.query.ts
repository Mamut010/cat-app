import { IQuery } from "@nestjs/cqrs";

export class FindCatsQuery implements IQuery {
    public constructor(
        public readonly skip?: number,
        public readonly take?: number,
    ) {}
}
