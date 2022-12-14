import { Author, Book, Prisma } from '@prisma/client'
import { ResolverContext } from '../../../@types/ResolverContext'
import { errorHandler } from '../../../utils/errorHandler'

const getAuthors = (
    _parent: unknown,
    args: unknown,
    context: ResolverContext
): Promise<Author[]> => {
    try {
        const { orm } = context
        const { skip, take, where } = args as { skip: number, take: number, where: Prisma.AuthorWhereInput }
        const authors = orm.author.findMany({
            skip: skip || 0,
            take: take || 10,
            where
        })

        if (!authors) throw new Error('Authors not found')
        return authors
    } catch (error) {
        throw errorHandler(error)
    }
}

const getAuthor = (
    _parent: unknown,
    args: unknown,
    context: ResolverContext
): Promise<Author | null> => {
    try {
        const { orm } = context
        const { id } = args as { id: string }

        const author = orm.author.findUnique({
            where: {
                id,
            },
        })

        if (!author) throw new Error('Author not found')
        return author
    } catch (error) {
        throw errorHandler(error)
    }
}

const getAuthorByBook = async (
    parent: Book,
    args: unknown,
    context: ResolverContext
): Promise<Author | undefined> => {
    try {
        const authors = await getAuthors(parent, args, context)
        return authors.find((author) => author.id === parent.authorId)
    } catch (error) {
        throw errorHandler(error)
    }
}

const createAuthor = (
    _parent: unknown,
    args: unknown,
    context: ResolverContext
): Promise<Author> => {
    try {
        const { orm } = context
        const { author: authorInput } = args as { author: Author }
        const { name, surname, birth } = authorInput as Author

        if (!name || !surname || !birth)
            throw new Error('Author data is required')

        const author = orm.author.create({
            data: {
                name,
                surname,
                birth,
            },
        })

        return author
    } catch (error) {
        throw errorHandler(error)
    }
}

const updateAuthor = (
    _parent: unknown,
    args: unknown,
    context: ResolverContext
): Promise<Author> => {
    try {
        const { id } = args as { id: string }
        const { author: authorInput } = args as { author: Author }
        const { name, surname, birth } = authorInput as Author

        if (!id) throw new Error('Author id is required')
        if (!name || !surname || !birth)
            throw new Error('Author data is required')

        const updatedAuthor = context.orm.author.update({
            where: {
                id,
            },
            data: {
                name,
                surname,
                birth,
            },
        })

        return updatedAuthor
    } catch (error) {
        throw errorHandler(error)
    }
}

const deleteAuthor = (
    _parent: unknown,
    args: unknown,
    context: ResolverContext
): Promise<Author> => {
    try {
        const { id } = args as { id: string }

        if (!id) throw new Error('Author id is required')

        const deletedAuthor = context.orm.author.delete({
            where: {
                id,
            },
        })

        return deletedAuthor
    } catch (error) {
        throw errorHandler(error)
    }
}

export {
    getAuthors,
    getAuthor,
    getAuthorByBook,
    createAuthor,
    updateAuthor,
    deleteAuthor,
}
