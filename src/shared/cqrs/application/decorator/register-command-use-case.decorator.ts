import { Type } from "src/shared/utils/type";
import { Command } from "../contract";
import { MetadataKey } from "../metadata-key";

export const RegisterCommandUseCase = (command: Type<Command>): ClassDecorator => {
    return (target: object) => Reflect.defineMetadata(MetadataKey.COMMAND_USE_CASE, command, target);
};
