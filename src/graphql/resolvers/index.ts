import { Datetime } from '../../modules/base/scalar.model'
import {
    createBook,
    deleteBook,
    getBook,
    getBooks,
    updateBook,
} from '../../modules/controllers/book/book.controller'
import {
    createAuthor,
    deleteAuthor,
    getAuthor,
    getAuthorByBook,
    getAuthors,
    updateAuthor,
} from '../../modules/controllers/author/author.controller'
import { ResolverContext } from '../../@types/ResolverContext'
import { Book } from '@prisma/client'

const Query = {
    getBooks: (parent: unknown, args: unknown, context: ResolverContext) =>
        getBooks(parent, args, context),
    getBook: (parent: any, args: unknown, context: ResolverContext) =>
        getBook(parent, args, context),
    getAuthors: (parent: unknown, args: unknown, context: ResolverContext) =>
        getAuthors(parent, args, context),
    getAuthor: (parent: unknown, args: unknown, context: ResolverContext) =>
        getAuthor(parent, args, context),
}

const Mutation = {
    createBook: (parent: unknown, args: unknown, context: ResolverContext) =>
        createBook(parent, args, context),
    updateBook: (parent: unknown, args: unknown, context: ResolverContext) =>
        updateBook(parent, args, context),
    deleteBook: (parent: unknown, args: unknown, context: ResolverContext) =>
        deleteBook(parent, args, context),
    createAuthor: (parent: unknown, args: unknown, context: ResolverContext) =>
        createAuthor(parent, args, context),
    updateAuthor: (parent: unknown, args: unknown, context: ResolverContext) =>
        updateAuthor(parent, args, context),
    deleteAuthor: (parent: unknown, args: unknown, context: ResolverContext) =>
        deleteAuthor(parent, args, context),
}

const Book = {
    author: (parent: Book, args: unknown, context: ResolverContext) =>
        getAuthorByBook(parent, args, context),
}

export { Datetime, Query, Mutation, Book }
