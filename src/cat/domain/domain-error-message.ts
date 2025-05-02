import { ValueOf } from "../../shared/utils/type";

export const DomainErrorMessage = {
    INVALID_CAT_ID: "Invalid cat id",
    CAT_NAME_EMPTY: "Cat name is empty",
    CAT_NOT_FOUND: "Cat not found",
} as const;

export type DomainErrorMessage = ValueOf<typeof DomainErrorMessage>;
