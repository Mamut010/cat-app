import { Module } from "@nestjs/common";
import { CqrsModule as NestCqrsModule } from "@nestjs/cqrs";
import { DOMAIN_AGGREGATE_MERGER } from "./injection-token";
import { DomainAggregateMergerImpl } from "./domain/shim/domain-aggregate-merger.impl";

@Module({
    imports: [NestCqrsModule],
    providers: [
        {
            provide: DOMAIN_AGGREGATE_MERGER,
            useClass: DomainAggregateMergerImpl,
        },
    ],
    exports: [NestCqrsModule, DOMAIN_AGGREGATE_MERGER],
})
export class CqrsModule {}
