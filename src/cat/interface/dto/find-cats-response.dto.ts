import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Min, ValidateNested } from "class-validator";

class Cat {
    @IsInt()
    @Min(1)
    readonly id: number;

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    readonly hairColor: string;

    @IsOptional()
    @IsString()
    readonly kind: string | null;
}

export class FindCatsResponseDto {
    @ValidateNested({ each: true })
    @IsArray()
    declare readonly cats: Cat[];
}
