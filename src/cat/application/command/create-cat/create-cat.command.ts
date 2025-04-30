import { ICommand } from "@nestjs/cqrs";

export class CreateCatCommand implements ICommand {
    constructor(
        public readonly name: string,
        public readonly hairColor: string,
        public readonly kind: string | null,
    ) {}
}
