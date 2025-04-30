import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateCatCommand } from "./create-cat.command";
import { Inject } from "@nestjs/common";
import { InjectionToken } from "../../../injection-token";
import { CreateCatResult } from "./create-cat.result";
import { CatFactory } from "src/cat/domain/factory";
import { CatRepository } from "src/cat/domain/repo";

@CommandHandler(CreateCatCommand)
export class CreateCatHandler implements ICommandHandler<CreateCatCommand, CreateCatResult> {
    public constructor(
        @Inject(InjectionToken.CAT_FACTORY)
        private readonly catFactory: CatFactory,

        @Inject(InjectionToken.CAT_REPOSITORY)
        private readonly catRepo: CatRepository,
    ) {}

    public async execute(command: CreateCatCommand): Promise<CreateCatResult> {
        const newId = await this.catRepo.newId();
        const cat = this.catFactory.create({
            ...command,
            id: newId,
        });

        cat.persist();

        await this.catRepo.save(cat);

        cat.commit();

        return new CreateCatResult(newId);
    }
}
