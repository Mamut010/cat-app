import { CatRenamedEvent } from "../event/cat-renamed.event";
import { DomainErrorMessage } from "../domain-error-message";
import { CatCreatedEvent } from "../event/cat-created.event";
import { DomainAggregateRoot } from "src/shared/cqrs";
import { InvalidArgumentException } from "src/shared/error";

export type CatEssentialProperties = Readonly<
    Required<{
        id: number;
        name: string;
        hairColor: string;
    }>
>;

export type CatOptionalProperties = Readonly<
    Partial<{
        kind: string | null;
    }>
>;

export type CatProperties = CatEssentialProperties & Required<CatOptionalProperties>;

export class Cat extends DomainAggregateRoot<number, Cat> {
    private readonly _id: number;
    private _name: string;
    private readonly _hairColor: string;
    private readonly _kind: string | null;

    constructor(properties: CatProperties, isNew: boolean = true) {
        const name = properties.name.trim();
        Cat.ensureValidId(properties.id);
        Cat.ensureValidName(name);

        super();
        this._id = properties.id;
        this._name = name;
        this._hairColor = properties.hairColor.trim();
        this._kind = properties.kind?.trim() ?? null;

        if (isNew) {
            this.apply(new CatCreatedEvent(this._id, this._name));
        }
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get hairColor(): string {
        return this._hairColor;
    }

    get kind(): string | null {
        return this._kind;
    }

    set name(name: string) {
        name = name.trim();
        const oldName = this._name;
        if (name === oldName) {
            return;
        }

        this._name = name;
        this.apply(new CatRenamedEvent(this._id, oldName, name));
    }

    private static ensureValidId(id: number) {
        if (id <= 0) {
            throw new InvalidArgumentException(DomainErrorMessage.INVALID_CAT_ID);
        }
    }

    private static ensureValidName(name: string) {
        if (name === "") {
            throw new InvalidArgumentException(DomainErrorMessage.CAT_NAME_EMPTY);
        }
    }
}
