import { Type } from "src/shared/utils/type";
import { Query } from "../contract";
import { MetadataKey } from "../metadata-key";

export const RegisterQueryUseCase = (query: Type<Query>): ClassDecorator => {
    return (target: object) => Reflect.defineMetadata(MetadataKey.QUERY_USE_CASE, query, target);
};
