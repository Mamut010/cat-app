import { Type } from "src/shared/utils/type";
import { Command, CommandUseCase, Query, QueryResult, QueryUseCase } from "../contract";
import { Provider } from "@nestjs/common";
import { AutoHandler } from "./auto-handler";
import { DomainEvent } from "src/shared/domain";
import { DomainEventHandler } from "../contract/domain-event-handler";

export class HandlerProvider {
    private constructor() {}

    public static command<
        TCommand extends Command,
        TResult,
        TUseCase extends CommandUseCase<TCommand, TResult>,
    >(command: Type<TCommand>, useCase: Type<TUseCase>): Provider {
        return {
            provide: Symbol.for(useCase.name),
            useClass: AutoHandler.command(command, useCase),
        };
    }

    public static query<
        TQuery extends Query,
        TResult extends QueryResult,
        TUseCase extends QueryUseCase<TQuery, TResult>,
    >(query: Type<Query>, useCase: Type<TUseCase>): Provider {
        return {
            provide: Symbol.for(useCase.name),
            useClass: AutoHandler.query(query, useCase),
        };
    }

    public static event<TEvent extends DomainEvent, TEventHandler extends DomainEventHandler<TEvent>>(
        event: Type<TEvent> | Type<DomainEvent>[],
        handler: Type<TEventHandler>,
    ): Provider {
        return {
            provide: Symbol.for(handler.name),
            useClass: AutoHandler.event(event, handler),
        };
    }

    public static commands(...pairs: [Type<Command>, Type<CommandUseCase<Command>>][]): Provider[] {
        return pairs.map(([command, useCase]) => HandlerProvider.command(command, useCase));
    }

    public static queries(...pairs: [Type<Query>, Type<QueryUseCase<Query, QueryResult>>][]): Provider[] {
        return pairs.map(([query, useCase]) => HandlerProvider.query(query, useCase));
    }

    public static events(
        ...pairs: [Type<DomainEvent> | Type<DomainEvent>[], Type<DomainEventHandler<DomainEvent>>][]
    ): Provider[] {
        return pairs.map(([event, handler]) => HandlerProvider.event(event, handler));
    }
}
