import { IntegrationEvent } from "../contract/integration-event";

export class CatRenamedIntegrationEvent implements IntegrationEvent {
    public constructor(
        public readonly id: number,
        public readonly oldName: string,
        public readonly newName: string,
    ) {}
}
