import { Datetime } from "../modules/base/scalar.model";
import {
  createBook,
  getBook,
  getBooks,
} from "../modules/book/book.resolver";
import { getAuthor, getAuthors } from "../modules/author/auhtor.resolver";
import { ResolverContext } from "../@types/ResolverContext";

const Query = {
  getBooks: (parent: unknown, args: unknown, context: ResolverContext) =>
    getBooks(parent, args, context),
  getBook: (parent: any, args: unknown, context: ResolverContext) =>
    getBook(parent, args, context),
  getAuthors: () => getAuthors(),
  getAuthor: (parent: any, args: { id: string }) => getAuthor(args.id),
};

const Mutation = {
  createBook: (parent: unknown, args: unknown, context: ResolverContext) =>
    createBook(parent, args, context),
  createAuthor: ({}) => "New author created",
};

export { Datetime, Query, Mutation };
