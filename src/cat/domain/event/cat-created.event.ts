import { IEvent } from "@nestjs/cqrs";

export class CatCreatedEvent implements IEvent {
    public constructor(
        public readonly id: number,
        public readonly name: string,
    ) {}
}
