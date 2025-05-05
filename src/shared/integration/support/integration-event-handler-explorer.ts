import { Injectable } from "@nestjs/common";
import { DiscoveryService } from "@nestjs/core";
import { METADATA_KEY } from "../metadata-key";
import { TargetWithIntegrationEventHandlerMetadata, IntegrationEventHandlerMetadata } from "../type";

@Injectable()
export class IntegrationEventHandlerExplorer {
    public constructor(private readonly discoveryService: DiscoveryService) {}

    public getIntegrationEventHandlerMetadata(): TargetWithIntegrationEventHandlerMetadata[] {
        const controllers = this.discoveryService
            .getControllers()
            .map((wrapper) => wrapper.instance as object | undefined)
            .filter((instance): instance is object => Boolean(instance));

        return controllers
            .map((controller) => {
                const metadata = Reflect.getMetadata(METADATA_KEY.INTEGRATION_EVENT_HANDLER, controller) as
                    | IntegrationEventHandlerMetadata
                    | undefined;
                return { target: controller, metadata };
            })
            .filter((e): e is TargetWithIntegrationEventHandlerMetadata => typeof e.metadata !== "undefined");
    }
}
