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

export { getAuthors, getAuthor, createAuthor }
