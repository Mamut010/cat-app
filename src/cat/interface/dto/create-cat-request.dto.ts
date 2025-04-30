import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCatRequestDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    readonly hairColor: string;

    @IsOptional()
    @IsString()
    readonly kind: string | null = null;
}
