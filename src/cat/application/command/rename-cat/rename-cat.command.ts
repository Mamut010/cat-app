import { ICommand } from "@nestjs/cqrs";

export class RenameCatCommand implements ICommand {
    constructor(
        public readonly id: number,
        public readonly newName: string,
    ) {}
}
