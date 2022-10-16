import { Book } from '@prisma/client'
import { ResolverContext } from '../../../@types/ResolverContext'

const getBooks = (
    parent: unknown,
    args: unknown,
    context: ResolverContext
): Promise<Book[]> => {
    const { orm } = context
    const books = orm.book.findMany()

    if (!books) throw new Error('Books not found')
    return books
}

const getBook = (
    parent: unknown,
    args: unknown,
    context: ResolverContext
): Promise<Book | null> => {
    const { orm } = context
    const { id } = args as { id: string }

    const book = orm.book.findUnique({
        where: {
            id,
        },
    })

    if (!book) throw new Error('Book not found')
    return book
}

const createBook = (
    parent: unknown,
    args: unknown,
    context: ResolverContext
): Promise<Book> => {
    const { orm } = context
    const { book } = args as { book: Book }
    const { title, description, year, category, authorId } = book

    if (!title || !description || !year || !category || !authorId)
        throw new Error('Book data is required')

    try {
        const newBook = orm.book.create({
            data: {
                title,
                description,
                year,
                category,
                authorId,
            },
        })
        
        return newBook
    } catch (error) {
        throw new Error(error)
    }
}

const updateBook = (
    parent: unknown,
    arg: unknown,
    context: ResolverContext
): Promise<Book> => {
    try {
        const { orm } = context
        const { id } = arg as { id: string }
        const { book } = arg as { book: Book }
        const { title, description, year, category, authorId } = book

        if (!id) throw new Error('Book id is required')
        if (!title || !description || !year || !category || !authorId)
            throw new Error('Book data is required')

        const updatedBook = orm.book.update({
            where: {
                id,
            },
            data: {
                title,
                description,
                year,
                category,
                authorId,
            },
        })

        return updatedBook
    } catch (error: any) {
        throw new Error(error)
    }
}

const deleteBook = (
    parent: unknown,
    arg: unknown,
    context: ResolverContext
): Promise<Book> => {
    try {
        const { orm } = context
        const { id } = arg as { id: string }
        if (!id) throw new Error('Book id is required')

        const deletedBook = orm.book.delete({
            where: {
                id,
            },
        })
        return deletedBook
    } catch (error: any) {
        throw new Error(error)
    }
}

export { getBooks, getBook, createBook, updateBook, deleteBook }
