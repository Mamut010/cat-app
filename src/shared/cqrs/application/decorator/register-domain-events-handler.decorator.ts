import { DomainEvent } from "src/shared/cqrs";
import { MetadataKey } from "../metadata-key";
import { Type } from "src/shared/utils/type";

export const RegisterDomainEventsHandler = (
    event: Type<DomainEvent>,
    ...events: Type<DomainEvent>[]
): ClassDecorator => {
    events.push(event);
    return (target: object) => Reflect.defineMetadata(MetadataKey.DOMAIN_EVENTS_HANDLER, events, target);
};
