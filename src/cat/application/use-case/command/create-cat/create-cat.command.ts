import { Command } from "src/shared/cqrs";

export class CreateCatCommand implements Command {
    constructor(
        public readonly name: string,
        public readonly hairColor: string,
        public readonly kind: string | null,
    ) {}
}
