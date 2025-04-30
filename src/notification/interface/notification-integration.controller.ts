import { Controller } from "@nestjs/common";
import {
    CatCreatedIntegrationEvent,
    CatRenamedIntegrationEvent,
    IntegrationEventHandler,
    Topic,
} from "src/shared/integration";

@Controller()
export class NotificationIntegrationController {
    @IntegrationEventHandler(Topic.CAT_CREATED)
    sendCatCreatedNotification(event: CatCreatedIntegrationEvent) {
        console.log(`A cat named '${event.name}' with id <${event.id}> has been created`);
    }

    @IntegrationEventHandler(Topic.CAT_RENAMED)
    sendCatRenamedNotification(event: CatRenamedIntegrationEvent) {
        console.log(`Cat <${event.id}> has been renamed from '${event.oldName}' to '${event.newName}'`);
    }
}
