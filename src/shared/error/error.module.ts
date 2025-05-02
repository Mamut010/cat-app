import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { BridgeAppExceptionFilter } from "./filter/bridge-app-exception.filter";

@Module({
    providers: [
        {
            provide: APP_FILTER,
            useClass: BridgeAppExceptionFilter,
        },
    ],
})
export class ErrorModule {}
