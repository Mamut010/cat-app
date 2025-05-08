import { getClassName } from "src/shared/utils/class";
import { METADATA_KEY } from "../metadata-key";
import { IntegrationEventHandlerMetadata } from "../type";

export interface IntegrationEventHandlerOptions {
    topic: string;
    queue?: string;
}

export function IntegrationEventHandler(topic: string): MethodDecorator;
export function IntegrationEventHandler(options: IntegrationEventHandlerOptions): MethodDecorator;
export function IntegrationEventHandler(
    topicOrOptions: string | IntegrationEventHandlerOptions,
): MethodDecorator {
    return (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const topic = typeof topicOrOptions === "string" ? topicOrOptions : topicOrOptions.topic;
        const className = getClassName(target);
        const serviceName = className ? extractServiceName(className) : "default";

        let queue = typeof topicOrOptions === "object" ? topicOrOptions.queue : undefined;
        queue ??= `${topic}:${serviceName}`;

        const metadata = getIntegrationEventHandlerMetadata(target);
        metadata[propertyKey] = { descriptor, queue, topic };

        Reflect.defineMetadata(METADATA_KEY.INTEGRATION_EVENT_HANDLER, metadata, target);
    };
}

function extractServiceName(className: string): string {
    return className
        .replace(/(Integration|IntegrationEvent)?(Controller|Listener|Handler|Service)$/i, "")
        .toLowerCase();
}

function getIntegrationEventHandlerMetadata(target: object) {
    const metadata = Reflect.getMetadata(METADATA_KEY.INTEGRATION_EVENT_HANDLER, target) as
        | IntegrationEventHandlerMetadata
        | undefined;
    return metadata ?? {};
}
