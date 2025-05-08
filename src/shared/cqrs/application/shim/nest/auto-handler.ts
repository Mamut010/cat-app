import {
    IQueryHandler,
    ICommandHandler,
    QueryHandler,
    CommandHandler,
    IEventHandler,
    EventsHandler,
} from "@nestjs/cqrs";
import { Type } from "src/shared/utils/type";
import {
    Command,
    CommandUseCase,
    DomainEventHandler,
    Query,
    QueryResult,
    QueryUseCase,
} from "../../contract";
import { Inject } from "@nestjs/common";
import { DomainEvent } from "src/shared/cqrs";
import { asArray } from "src/shared/utils/array";

export class AutoHandler {
    private constructor() {}

    public static command<
        TCommand extends Command,
        TResult,
        TUseCase extends CommandUseCase<TCommand, TResult>,
    >(command: Type<TCommand>, useCase: Type<TUseCase>): Type<ICommandHandler<TCommand, TResult>> {
        @CommandHandler(command)
        class Handler {
            constructor(@Inject(useCase) private readonly useCase: TUseCase) {}
            execute(command: TCommand): Promise<TResult> {
                return this.useCase.execute(command);
            }
        }

        return Handler as unknown as Type<ICommandHandler<TCommand, TResult>>;
    }

    public static query<
        TQuery extends Query,
        TResult extends QueryResult,
        TUseCase extends QueryUseCase<TQuery, TResult>,
    >(query: Type<TQuery>, useCase: Type<TUseCase>): Type<IQueryHandler<TQuery, TResult>> {
        @QueryHandler(query)
        class Handler {
            constructor(@Inject(useCase) private readonly useCase: TUseCase) {}
            execute(query: TQuery): Promise<TResult> {
                return this.useCase.execute(query);
            }
        }

        return Handler as unknown as Type<IQueryHandler<TQuery, TResult>>;
    }

    public static event<TEvent extends DomainEvent, TEventHandler extends DomainEventHandler<TEvent>>(
        event: Type<TEvent> | Type<DomainEvent>[],
        handler: Type<TEventHandler>,
    ): Type<IEventHandler<TEvent>> {
        @EventsHandler(...asArray(event))
        class Handler {
            constructor(@Inject(handler) private readonly handler: TEventHandler) {}
            handle(event: TEvent): any {
                return this.handler.handle(event);
            }
        }

        return Handler as unknown as Type<IEventHandler<TEvent>>;
    }
}
