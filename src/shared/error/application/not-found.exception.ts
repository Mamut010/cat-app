import { HttpStatus } from "@nestjs/common";
import { AppException, AppExceptionDetail, AppExceptionMessage } from "./app.exception";

export class NotFoundException extends AppException {
    public constructor(response: AppExceptionMessage = "404 Not Found", detail?: AppExceptionDetail) {
        super(HttpStatus.NOT_FOUND, response, detail);
    }
}
