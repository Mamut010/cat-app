import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class FindCatsRequestQsDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    readonly skip: number = 0;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    readonly take: number = 30;
}
