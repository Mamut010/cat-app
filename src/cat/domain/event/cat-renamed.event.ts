import { IEvent } from "@nestjs/cqrs";

export class CatRenamedEvent implements IEvent {
    public constructor(
        public readonly id: number,
        public readonly oldName: string,
        public readonly newName: string,
    ) {}
}
