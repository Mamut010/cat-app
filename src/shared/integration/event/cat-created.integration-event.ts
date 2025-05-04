import { IntegrationEvent } from "../contract/integration-event";

export class CatCreatedIntegrationEvent implements IntegrationEvent {
    public constructor(
        public readonly id: number,
        public readonly name: string,
    ) {}
}
