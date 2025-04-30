import { IsNotEmpty, IsString } from "class-validator";

export class RenameCatRequestDto {
    @IsString()
    @IsNotEmpty()
    newName: string;
}
