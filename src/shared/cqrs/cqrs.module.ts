import { ConfigurableModuleBuilder, Module } from "@nestjs/common";
import { CqrsModule as NestCqrsModule } from "@nestjs/cqrs";
import { AutoHandlerRegistraService } from "./application/service/auto-handler-registra.service";
import { DiscoveryModule } from "@nestjs/core";

const { ConfigurableModuleClass } = new ConfigurableModuleBuilder().build();

@Module({
    imports: [NestCqrsModule, DiscoveryModule],
    providers: [AutoHandlerRegistraService],
    exports: [NestCqrsModule],
})
export class CqrsModule extends ConfigurableModuleClass {}
