import {
    IQueryHandler,
    ICommandHandler,
    QueryHandler,
    CommandHandler,
    IEventHandler,
    EventsHandler,
} from "@nestjs/cqrs";
import { Class } from "src/shared/utils/type";
import { Command, CommandUseCase, Query, QueryResult, QueryUseCase } from "../contract";
import { Inject } from "@nestjs/common";
import { DomainEvent } from "src/shared/domain";
import { DomainEventHandler } from "../contract/domain-event-handler";
import { asArray } from "src/shared/utils/array";

export function AutoCommandHandler<
    TCommand extends Command,
    TResult,
    TUseCase extends CommandUseCase<TCommand, TResult>,
>(command: Class<TCommand>, useCase: Class<TUseCase>): Class<ICommandHandler<TCommand, TResult>> {
    @CommandHandler(command)
    class Handler {
        constructor(@Inject(useCase) private readonly useCase: TUseCase) {}
        execute(command: TCommand): Promise<TResult> {
            return this.useCase.execute(command);
        }
    }

    return Handler as unknown as Class<ICommandHandler<TCommand, TResult>>;
}

export function AutoQueryHandler<
    TQuery extends Query,
    TResult extends QueryResult,
    TUseCase extends QueryUseCase<TQuery, TResult>,
>(query: Class<TQuery>, useCase: Class<TUseCase>): Class<IQueryHandler<TQuery, TResult>> {
    @QueryHandler(query)
    class Handler {
        constructor(@Inject(useCase) private readonly useCase: TUseCase) {}
        execute(query: TQuery): Promise<TResult> {
            return this.useCase.execute(query);
        }
    }

    return Handler as unknown as Class<IQueryHandler<TQuery, TResult>>;
}

export function AutoEventHandler<
    TEvent extends DomainEvent = DomainEvent,
    TEventHandler extends DomainEventHandler<TEvent> = DomainEventHandler<TEvent>,
>(event: Class<TEvent> | Class<TEvent>[], handler: Class<TEventHandler>): Class<IEventHandler<TEvent>> {
    @EventsHandler(...asArray(event))
    class Handler {
        constructor(@Inject(handler) private readonly handler: TEventHandler) {}
        handle(event: TEvent): any {
            return this.handler.handle(event);
        }
    }

    return Handler as unknown as Class<IEventHandler<TEvent>>;
}
