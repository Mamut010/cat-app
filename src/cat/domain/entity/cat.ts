import { AggregateRoot } from "@nestjs/cqrs";
import { CatRenamedEvent } from "../event/cat-renamed.event";
import { UnprocessableEntityException } from "@nestjs/common";
import { ErrorMessage } from "../error-message";
import { CatCreatedEvent } from "../event/cat-created.event";

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

export interface Cat {
    get id(): number;
    get name(): string;
    get hairColor(): string;
    get kind(): string | null;

    set name(name: string);

    persist(): void;
    compareId(id: number): boolean;
    commit(): void;
}

export class CatImpl extends AggregateRoot implements Cat {
    private readonly _id: number;
    private _name: string;
    private readonly _hairColor: string;
    private readonly _kind: string | null;

    constructor(properties: CatProperties) {
        const name = properties.name.trim();
        CatImpl.ensureValidId(properties.id);
        CatImpl.ensureValidName(name);

        super();
        this._id = properties.id;
        this._name = name;
        this._hairColor = properties.hairColor.trim();
        this._kind = properties.kind?.trim() ?? null;
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

    public persist(): void {
        this.apply(new CatCreatedEvent(this._id, this._name));
    }

    public compareId(id: number): boolean {
        return this._id === id;
    }

    private static ensureValidId(id: number) {
        if (id <= 0) {
            throw new UnprocessableEntityException(ErrorMessage.INVALID_CAT_ID);
        }
    }

    private static ensureValidName(name: string) {
        if (name === "") {
            throw new UnprocessableEntityException(ErrorMessage.CAT_NAME_EMPTY);
        }
    }
}
