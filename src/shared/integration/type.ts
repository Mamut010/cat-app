export type IntegrationEventHandlerData = {
    descriptor: PropertyDescriptor;
    queue: string;
    topic: string;
};

export type IntegrationEventHandlerMetadata = Record<string | symbol, IntegrationEventHandlerData>;

export type TargetWithIntegrationEventHandlerMetadata = {
    target: object;
    metadata: IntegrationEventHandlerMetadata;
};
