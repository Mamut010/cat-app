import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateCatRequestDto } from "./dto/create-cat-request.dto";
import { FindCatsResponseDto } from "./dto/find-cats-response.dto";
import { FindCatsRequestQsDto } from "./dto/find-cats-request-qs.dto";
import { CreateCatResponseDto } from "./dto/create-cat-response.dto";
import { CreateCatCommand, CreateCatResult, RenameCatCommand, RenameCatResult } from "../application/command";
import { FindCatsQuery, FindCatsResult } from "../application/query";
import { RenameCatResponseDto } from "./dto/rename-cat-response.dto";
import { RenameCatRequestDto } from "./dto/rename-cat-request.dto";

@Controller("cat")
export class CatController {
    public constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    public async findAll(@Query() qs: FindCatsRequestQsDto): Promise<FindCatsResponseDto> {
        const query = new FindCatsQuery(qs.skip, qs.take);
        const result = await this.queryBus.execute<FindCatsQuery, FindCatsResult>(query);
        return { cats: [...result.cats] };
    }

    @Post()
    public async create(@Body() body: CreateCatRequestDto): Promise<CreateCatResponseDto> {
        const command = new CreateCatCommand(body.name, body.hairColor, body.kind);
        const result = await this.commandBus.execute<CreateCatCommand, CreateCatResult>(command);
        return { ...result };
    }

    @Post(":id/rename")
    public async rename(@Param("id") id: number, @Body() body: RenameCatRequestDto): Promise<RenameCatResponseDto> {
        const command = new RenameCatCommand(id, body.newName);
        const result = await this.commandBus.execute<RenameCatCommand, RenameCatResult>(command);
        return { ...result };
    }
}
