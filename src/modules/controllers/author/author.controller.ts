import { Author } from '@prisma/client'
import { ResolverContext } from '../../../@types/ResolverContext'

const getAuthors = (
    parent: unknown,
    args: unknown,
    context: ResolverContext
): Promise<Author[]> => {
    return context.orm.author.findMany()
}

const getAuthor = (
    parent: unknown,
    args: unknown,
    context: ResolverContext
): Promise<Author | null> => {
    const { id } = args as { id: string }
    const author = context.orm.author.findUnique({
        where: {
            id,
        },
    })

    return author
}

const createAuthor = (
    parent: unknown,
    args: unknown,
    context: ResolverContext
): Promise<Author> => {
    try {
        const { author: authorInput } = args as { author: Author }
        const { name, surname, birth } = authorInput as Author
        const author = context.orm.author.create({
            data: {
                name,
                surname,
                birth,
            },
        })

        return author
    } catch (error: any) {
        console.log(error)
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

export { getAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor }
