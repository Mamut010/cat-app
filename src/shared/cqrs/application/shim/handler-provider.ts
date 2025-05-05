import { Type } from "src/shared/utils/type";
import { Command, CommandUseCase, Query, QueryResult, QueryUseCase } from "../contract";
import { ClassProvider } from "@nestjs/common";
import { AutoHandler } from "./auto-handler";
import { DomainEvent } from "src/shared/cqrs";
import { DomainEventHandler } from "../contract/domain-event-handler";
import { ICommandHandler, IEventHandler, IQueryHandler } from "@nestjs/cqrs";
import { MetadataKey } from "../metadata-key";

export class HandlerProvider {
    private constructor() {}

    public static command<
        TCommand extends Command,
        TResult,
        TUseCase extends CommandUseCase<TCommand, TResult>,
    >(command: Type<TCommand>, useCase: Type<TUseCase>): ClassProvider<ICommandHandler> {
        return {
            provide: Symbol.for(useCase.name),
            useClass: AutoHandler.command(command, useCase),
        };
    }

    public static query<
        TQuery extends Query,
        TResult extends QueryResult,
        TUseCase extends QueryUseCase<TQuery, TResult>,
    >(query: Type<Query>, useCase: Type<TUseCase>): ClassProvider<IQueryHandler> {
        return {
            provide: Symbol.for(useCase.name),
            useClass: AutoHandler.query(query, useCase),
        };
    }

    public static event<TEvent extends DomainEvent, TEventHandler extends DomainEventHandler<TEvent>>(
        event: Type<TEvent> | Type<DomainEvent>[],
        handler: Type<TEventHandler>,
    ): ClassProvider<IEventHandler> {
        return {
            provide: Symbol.for(handler.name),
            useClass: AutoHandler.event(event, handler),
        };
    }

    public static fromDecorated(...targets: Type[]): ClassProvider[] {
        return targets
            .flatMap((target) => [
                HandlerProvider.getCommandHandlerProvider(target),
                HandlerProvider.getQueryHandlerProvider(target),
                HandlerProvider.getEventsHandlerProvider(target),
            ])
            .filter((provider) => provider !== null);
    }

    private static getCommandHandlerProvider(target: Type): ClassProvider | null {
        const command = Reflect.getMetadata(MetadataKey.COMMAND_USE_CASE, target) as Type<Command> | null;
        return command ? HandlerProvider.command(command, target) : null;
    }

    private static getQueryHandlerProvider(target: Type): ClassProvider | null {
        const query = Reflect.getMetadata(MetadataKey.QUERY_USE_CASE, target) as Type<Query> | null;
        return query ? HandlerProvider.query(query, target) : null;
    }

    private static getEventsHandlerProvider(target: Type): ClassProvider | null {
        const events = Reflect.getMetadata(MetadataKey.DOMAIN_EVENTS_HANDLER, target) as
            | Type<DomainEvent>[]
            | null;
        return events ? HandlerProvider.event(events, target) : null;
    }
}
