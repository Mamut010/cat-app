import { DomainEvent } from "src/shared/domain";

export class CatCreatedEvent implements DomainEvent {
    public constructor(
        public readonly id: number,
        public readonly name: string,
    ) {}
}
