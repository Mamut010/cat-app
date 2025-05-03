/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ClassProvider, Injectable } from "@nestjs/common";
import { DiscoveryService } from "@nestjs/core";
import { MetadataKey } from "../metadata-key";
import { Type } from "src/shared/utils/type";
import { HandlerProvider } from "../shim";
import { DomainEvent } from "src/shared/cqrs";
import { Command, Query } from "../contract";

@Injectable()
export class AutoHandlerRegistraService {
    public constructor(private readonly discoveryService: DiscoveryService) {}

    public register(): ClassProvider[] {
        const metatypes = this.discoveryService
            .getProviders()
            .map((wrapper) => wrapper.metatype)
            .filter((metatype) => metatype);

        const useCaseTypes = metatypes.filter((e) => e?.name.includes("UseCase"));
        console.log(`Found ${useCaseTypes.length} use case(s)`);

        const handlerProviders = metatypes
            .flatMap((metatype) => [
                this.getCommandHandlerProvider(metatype),
                this.getQueryHandlerProvider(metatype),
                this.getEventsHandlerProvider(metatype),
            ])
            .filter((e) => e !== null);

        return handlerProviders;
    }

    private getCommandHandlerProvider(metatype: any): ClassProvider | null {
        const command = Reflect.getMetadata(MetadataKey.COMMAND_USE_CASE, metatype) as Type<Command> | null;
        return command ? HandlerProvider.command(command, metatype) : null;
    }

    private getQueryHandlerProvider(metatype: any): ClassProvider | null {
        const query = Reflect.getMetadata(MetadataKey.QUERY_USE_CASE, metatype) as Type<Query> | null;
        return query ? HandlerProvider.query(query, metatype) : null;
    }

    private getEventsHandlerProvider(metatype: any): ClassProvider | null {
        const events = Reflect.getMetadata(MetadataKey.DOMAIN_EVENTS_HANDLER, metatype) as
            | Type<DomainEvent>[]
            | null;

        return events ? HandlerProvider.event(events, metatype) : null;
    }
}
