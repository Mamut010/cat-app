import { Class } from "src/shared/utils/type";
import { Command, CommandUseCase, Query, QueryResult, QueryUseCase } from "../contract";
import { Provider, Type } from "@nestjs/common";
import { AutoCommandHandler, AutoEventHandler, AutoQueryHandler } from "./auto-handler";
import { DomainEvent } from "src/shared/domain";
import { DomainEventHandler } from "../contract/domain-event-handler";

export function registerCommandHandler<
    TCommand extends Command,
    TResult,
    TUseCase extends CommandUseCase<TCommand, TResult>,
>(command: Class<TCommand>, useCase: Class<TUseCase>): Provider {
    return {
        provide: Symbol.for(useCase.name),
        useClass: AutoCommandHandler(command, useCase),
    };
}

export function registerQueryHandler<
    TQuery extends Query,
    TResult extends QueryResult,
    TUseCase extends QueryUseCase<TQuery, TResult>,
>(query: Class<Query>, useCase: Class<TUseCase>): Provider {
    return {
        provide: Symbol.for(useCase.name),
        useClass: AutoQueryHandler(query, useCase),
    };
}

export function registerEventHandler<
    TEvent extends DomainEvent = DomainEvent,
    TEventHandler extends DomainEventHandler<TEvent> = DomainEventHandler<TEvent>,
>(event: Class<TEvent> | Class<TEvent>[], handler: Class<TEventHandler>): Provider {
    return {
        provide: Symbol.for(handler.name),
        useClass: AutoEventHandler(event, handler),
    };
}

export function registerCommandHandlers(pairs: [Type<Command>, Type<CommandUseCase<Command>>][]): Provider[] {
    return pairs.map(([command, useCase]) => registerCommandHandler(command, useCase));
}

export function registerQueryHandlers(
    pairs: [Type<Query>, Type<QueryUseCase<Query, QueryResult>>][],
): Provider[] {
    return pairs.map(([query, useCase]) => registerQueryHandler(query, useCase));
}

export function registerEventHandlers(
    pairs: [Type<DomainEvent> | Type<DomainEvent>[], Type<DomainEventHandler<DomainEvent>>][],
): Provider[] {
    return pairs.map(([event, handler]) => registerEventHandler(event, handler));
}
