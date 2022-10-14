import { Datetime } from "../modules/base/scalar.model";
import { createBook, getBook, getBooks } from "../modules/book/book.resolver";
import { createAuthor, getAuthor, getAuthors } from "../modules/author/auhtor.resolver";
import { ResolverContext } from "../@types/ResolverContext";

const Query = {
  getBooks: (parent: unknown, args: unknown, context: ResolverContext) =>
    getBooks(parent, args, context),
  getBook: (parent: any, args: unknown, context: ResolverContext) =>
    getBook(parent, args, context),
  getAuthors: (parent: unknown, args: unknown, context: ResolverContext) =>
    getAuthors(parent, args, context),
  getAuthor: (parent: unknown, args: unknown, context: ResolverContext) =>
    getAuthor(parent, args, context),
};

const Mutation = {
  createBook: (parent: unknown, args: unknown, context: ResolverContext) =>
    createBook(parent, args, context),
  createAuthor: (parent: unknown, args: unknown, context: ResolverContext) =>
    createAuthor(parent, args, context),
};

export { Datetime, Query, Mutation };
