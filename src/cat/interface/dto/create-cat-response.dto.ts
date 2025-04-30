import { IsInt, Min } from "class-validator";

export class CreateCatResponseDto {
    @IsInt()
    @Min(1)
    readonly id: number;
}
