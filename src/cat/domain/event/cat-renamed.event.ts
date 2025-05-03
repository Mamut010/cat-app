import { DomainEvent } from "src/shared/cqrs";

export class CatRenamedEvent implements DomainEvent {
    public constructor(
        public readonly id: number,
        public readonly oldName: string,
        public readonly newName: string,
    ) {}
}
