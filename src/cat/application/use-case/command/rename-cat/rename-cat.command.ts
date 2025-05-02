import { Command } from "src/shared/application";

export class RenameCatCommand implements Command {
    constructor(
        public readonly id: number,
        public readonly newName: string,
    ) {}
}
