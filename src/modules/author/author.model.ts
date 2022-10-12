import { BaseModel } from "../base/base.model";

export type AuthorModel = BaseModel & {
    name: string;
    surname: string;
    birthDate: Date;
};