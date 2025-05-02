export type AppExceptionMessage = string | Record<string, unknown>;

export type AppExceptionDetail = {
    cause: unknown;
    description?: string;
};

export class AppException extends Error {
    public readonly description?: string;

    public constructor(
        public readonly status: number,
        public readonly response: AppExceptionMessage = "",
        detail?: AppExceptionDetail,
    ) {
        const message = typeof response === "string" ? response : JSON.stringify(response);
        super(message, { cause: detail?.cause });
        this.description = detail?.description;
    }
}
