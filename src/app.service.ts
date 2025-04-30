import { Get, HttpCode, HttpStatus, Injectable } from "@nestjs/common";
import { ApiNoContentResponse } from "@nestjs/swagger";

@Injectable()
export class AppService {
    getHello(): string {
        return "Hello World!";
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse()
    @Get("favicon.io")
    favicon(): void {
        return;
    }
}
