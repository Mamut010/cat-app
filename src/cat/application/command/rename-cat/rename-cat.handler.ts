import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RenameCatCommand } from "./rename-cat.command";
import { RenameCatResult } from "./rename-cat.result";
import { Inject, NotFoundException } from "@nestjs/common";
import { InjectionToken } from "../../../injection-token";
import { CatRepository } from "src/cat/domain/repo";
import { ErrorMessage } from "src/cat/domain/error-message";

@CommandHandler(RenameCatCommand)
export class RenameCatHandler implements ICommandHandler<RenameCatCommand, RenameCatResult> {
    public constructor(
        @Inject(InjectionToken.CAT_REPOSITORY)
        private readonly catRepo: CatRepository,
    ) {}

    public async execute(command: RenameCatCommand): Promise<RenameCatResult> {
        const cat = await this.catRepo.findById(command.id);
        if (!cat) {
            throw new NotFoundException(ErrorMessage.CAT_NOT_FOUND);
        }

        cat.name = command.newName;

        await this.catRepo.save(cat);

        cat.commit();

        return new RenameCatResult(cat.id, cat.name);
    }
}
