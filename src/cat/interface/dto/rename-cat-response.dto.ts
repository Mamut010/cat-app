import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class RenameCatResponseDto {
    @IsInt()
    @Min(1)
    readonly id: number;

    @IsString()
    @IsNotEmpty()
    readonly name: string;
}
