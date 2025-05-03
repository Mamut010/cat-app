import { HandlerProvider } from "src/shared/cqrs";
import {
    CatCreatedHandler,
    CatOperationHandler,
    CatRenamedHandler,
    CreateCatUseCase,
    FindCatsUseCase,
    RenameCatUseCase,
} from "../application";

export const handlerProviders = HandlerProvider.fromDecorated(
    CreateCatUseCase,
    RenameCatUseCase,
    FindCatsUseCase,
    CatCreatedHandler,
    CatRenamedHandler,
    CatOperationHandler,
);
