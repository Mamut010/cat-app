import { Command } from "src/shared/cqrs";

export class RenameCatCommand implements Command {
    constructor(
        public readonly id: number,
        public readonly newName: string,
    ) {}
}
