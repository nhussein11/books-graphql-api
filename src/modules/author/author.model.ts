import { BaseModel } from "../base/base.model";

export type Author = BaseModel & {
    name: string;
    surname: string;
    birthDate: Date;
};