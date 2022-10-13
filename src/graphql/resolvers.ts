import { Datetime } from "../modules/base/scalar.model";
import { getBook, getBooks } from "../modules/book/book.resolver";
import { getAuthor, getAuthors } from "../modules/author/auhtor.resolver";

const Query = {
  getBooks: () => getBooks(),
  getBook: (parent: any, args: { id: string }) => getBook(args.id),
  getAuthors: () => getAuthors(),
  getAuthor: (parent: any, args: { id: string }) => getAuthor(args.id),
};

const Mutation = {
  createBook: ({}) => "New book created",
  createAuthor: ({}) => "New author created",
};

export { Datetime, Query, Mutation };
