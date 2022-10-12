import { BaseModel } from "../base/base.model";

export type Book = BaseModel & {
  title: string;
  description: string;
  year: number;
  category: CategoryEnum;
};

export enum CategoryEnum {
  ADVENTURE = "adventure",
  HORROR = "horror",
  SCIENCE_FICTION = "science-fiction",
  ROMANCE = "romance",
}
