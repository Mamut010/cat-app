import { Type } from "src/shared/utils/type";
import { Command, CommandUseCase, Query, QueryResult, QueryUseCase } from "../contract";
import { ClassProvider } from "@nestjs/common";
import { AutoHandler } from "./auto-handler";
import { DomainEvent } from "src/shared/cqrs";
import { DomainEventHandler } from "../contract/domain-event-handler";
import { ICommandHandler, IEventHandler, IQueryHandler } from "@nestjs/cqrs";

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

    public static commands(
        ...pairs: [Type<Command>, Type<CommandUseCase<Command>>][]
    ): ClassProvider<ICommandHandler>[] {
        return pairs.map(([command, useCase]) => HandlerProvider.command(command, useCase));
    }

    public static queries(
        ...pairs: [Type<Query>, Type<QueryUseCase<Query, QueryResult>>][]
    ): ClassProvider<IQueryHandler>[] {
        return pairs.map(([query, useCase]) => HandlerProvider.query(query, useCase));
    }

    public static events(
        ...pairs: [Type<DomainEvent> | Type<DomainEvent>[], Type<DomainEventHandler<DomainEvent>>][]
    ): ClassProvider<IEventHandler>[] {
        return pairs.map(([event, handler]) => HandlerProvider.event(event, handler));
    }
}
