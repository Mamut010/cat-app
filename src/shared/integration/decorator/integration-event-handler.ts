import { RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { IntegrationConfig } from "../config";
import { getClassName } from "src/shared/utils/class";

export interface IntegrationEventHandlerOptions {
    topic: string;
    queue?: string;
}

export function IntegrationEventHandler(topic: string): MethodDecorator;
export function IntegrationEventHandler(options: IntegrationEventHandlerOptions): MethodDecorator;
export function IntegrationEventHandler(
    topicOrOptions: string | IntegrationEventHandlerOptions,
): MethodDecorator {
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const topic = typeof topicOrOptions === "string" ? topicOrOptions : topicOrOptions.topic;
        const className = getClassName(target);
        const serviceName = className ? extractServiceName(className) : "default";

        let queue: string;
        if (typeof topicOrOptions === "string") {
            queue = `${topic}:${serviceName}`;
        } else {
            queue = topicOrOptions.queue ?? `${topic}:${serviceName}`;
        }

        return RabbitSubscribe({
            exchange: IntegrationConfig.INTEGRATION_EVENT_EXCHANGE,
            routingKey: topic,
            queue,
        })(target, propertyKey, descriptor);
    };
}

function extractServiceName(className: string): string {
    return className
        .replace(/(Integration|IntegrationEvent)?(Controller|Listener|Handler|Service)$/i, "")
        .toLowerCase();
}
