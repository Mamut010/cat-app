import { NotFoundException } from "src/shared/error";
import { RenameCatCommand } from "./rename-cat.command";
import { RenameCatResult } from "./rename-cat.result";
import { CatRepository, DomainErrorMessage } from "src/cat/domain";
import { CommandUseCase, RegisterCommandUseCase } from "src/shared/cqrs";

@RegisterCommandUseCase(RenameCatCommand)
export class RenameCatUseCase implements CommandUseCase<RenameCatCommand, RenameCatResult> {
    public constructor(private readonly catRepo: CatRepository) {}

    public async execute(command: RenameCatCommand): Promise<RenameCatResult> {
        const cat = await this.catRepo.findById(command.id);
        if (!cat) {
            throw new NotFoundException(DomainErrorMessage.CAT_NOT_FOUND);
        }

        cat.name = command.newName;

        await this.catRepo.save(cat);

        cat.commit();

        return new RenameCatResult(cat.id, cat.name);
    }
}
