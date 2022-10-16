import { Author, Book } from '@prisma/client'
import { ResolverContext } from '../../../@types/ResolverContext'

const getAuthors = (
    parent: unknown,
    args: unknown,
    context: ResolverContext
): Promise<Author[]> => {
    const { orm } = context
    const authors = orm.author.findMany()

    if (!authors) throw new Error('Authors not found')
    return authors
}

const getAuthor = (
    parent: unknown,
    args: unknown,
    context: ResolverContext
): Promise<Author | null> => {
    const { orm } = context
    const { id } = args as { id: string }

    const author = orm.author.findUnique({
        where: {
            id,
        },
    })

    if (!author) throw new Error('Author not found')
    return author
}

const getAuthorByBook = async (
    parent: Book,
    args: unknown,
    context: ResolverContext
): Promise<Author | undefined> => {
    const authors = await getAuthors(parent, args, context)
    return authors.find((author) => author.id === parent.authorId)
}

const createAuthor = (
    parent: unknown,
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
    } catch (error: any) {
        throw new Error(error)
    }
}

const updateAuthor = (
    parent: unknown,
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
    } catch (error: any) {
        throw new Error(error)
    }
}

const deleteAuthor = (
    parent: unknown,
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
    } catch (error: any) {
        throw new Error(error)
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
