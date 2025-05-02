import { Command } from "./command";
import { Query } from "./query";
import { QueryResult } from "./query-result";

interface UseCase<TIn, TOut = void> {
    execute(input: TIn): Promise<TOut>;
}

export interface CommandUseCase<TCommand extends Command, TResult = any> extends UseCase<TCommand, TResult> {
    execute(command: TCommand): Promise<TResult>;
}

export interface QueryUseCase<TQuery extends Query, TQueryResult extends QueryResult>
    extends UseCase<TQuery, TQueryResult> {
    execute(query: TQuery): Promise<TQueryResult>;
}
