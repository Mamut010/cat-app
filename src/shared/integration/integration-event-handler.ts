import { RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { IntegrationConfig } from "./config";

export interface IntegrationEventHandlerOptions {
    topic: string;
    queue?: string;
}

export function IntegrationEventHandler(topic: string): MethodDecorator;
export function IntegrationEventHandler(options: IntegrationEventHandlerOptions): MethodDecorator;
export function IntegrationEventHandler(topicOrOptions: string | IntegrationEventHandlerOptions): MethodDecorator {
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const topic = typeof topicOrOptions === "string" ? topicOrOptions : topicOrOptions.topic;
        const className = getClassName(target);
        const serviceName = className ? extractServiceName(className) : "default";

        let queue: string;
        if (typeof topicOrOptions === "string") {
            queue = `${serviceName}.${topic}`;
        } else {
            queue = topicOrOptions.queue ?? `${serviceName}.${topic}`;
        }

        return RabbitSubscribe({
            exchange: IntegrationConfig.INTEGRATION_EVENT_EXCHANGE,
            routingKey: topic,
            queue,
        })(target, propertyKey, descriptor);
    };
}

function extractServiceName(className: string): string {
    return className.replace(/(Integration)?(Controller|Listener|Handler)$/i, "").toLowerCase();
}

function getClassName(target: unknown): string | undefined {
    if (typeof target !== "object" || target === null) {
        return undefined;
    }
    if (Object.hasOwn(target, "constructor")) {
        return target.constructor.name;
    } else {
        return undefined;
    }
}
