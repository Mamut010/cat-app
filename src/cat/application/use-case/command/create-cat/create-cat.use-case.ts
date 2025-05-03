import { CommandUseCase, RegisterCommandUseCase } from "src/shared/cqrs";
import { CreateCatCommand } from "./create-cat.command";
import { CreateCatResult } from "./create-cat.result";
import { CatFactory, CatRepository } from "src/cat/domain";

@RegisterCommandUseCase(CreateCatCommand)
export class CreateCatUseCase implements CommandUseCase<CreateCatCommand, CreateCatResult> {
    public constructor(
        private readonly catFactory: CatFactory,
        private readonly catRepo: CatRepository,
    ) {}

    public async execute(command: CreateCatCommand): Promise<CreateCatResult> {
        const newId = await this.catRepo.newId();
        const cat = this.catFactory.create({
            ...command,
            id: newId,
        });

        await this.catRepo.save(cat);

        cat.commit();

        return new CreateCatResult(newId);
    }
}
