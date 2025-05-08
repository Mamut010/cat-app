import { Controller, Logger } from "@nestjs/common";
import {
    CatCreatedIntegrationEvent,
    CatRenamedIntegrationEvent,
    IntegrationEventHandler,
    Topic,
} from "src/shared/integration";

@Controller()
export class NotificationIntegrationController {
    private readonly log = new Logger("Notification");

    @IntegrationEventHandler(Topic.CAT_CREATED)
    sendCatCreatedNotification(event: CatCreatedIntegrationEvent) {
        this.log.log(`A cat named '${event.name}' with id <${event.id}> has been created`);
    }

    @IntegrationEventHandler(Topic.CAT_RENAMED)
    sendCatRenamedNotification(event: CatRenamedIntegrationEvent) {
        this.log.log(`Cat <${event.id}> has been renamed from '${event.oldName}' to '${event.newName}'`);
    }
}
