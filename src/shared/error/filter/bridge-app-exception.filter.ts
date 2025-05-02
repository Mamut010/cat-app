import { ArgumentsHost, Catch, HttpException, Injectable } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { AppException } from "../application";

@Catch()
@Injectable()
export class BridgeAppExceptionFilter extends BaseExceptionFilter<unknown> {
    override catch(exception: unknown, host: ArgumentsHost): void {
        if (exception instanceof AppException) {
            const httpException = new HttpException(exception.response, exception.status);
            super.catch(httpException, host);
        } else {
            super.catch(exception, host);
        }
    }
}
