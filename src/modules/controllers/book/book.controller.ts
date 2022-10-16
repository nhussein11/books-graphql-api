import { Book } from '@prisma/client'
import { ResolverContext } from '../../../@types/ResolverContext'

// const books: Book[] = [
//   {
//     id: "1",
//     createdAt: new Date(),
//     updatedAt: undefined,
//     deletedAt: undefined,
//     title: "The Hobbit",
//     description:
//       "The Hobbit, or There and Back Again is a children's fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in children's literature.",
//     year: 1937,
//     category: CategoryEnum.ADVENTURE,
//   },
//   {
//     id: "2",
//     createdAt: new Date(),
//     updatedAt: undefined,
//     deletedAt: undefined,
//     title: "The Lord of the Rings",
//     description:
//       "The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling novels ever written, with over 150 million copies sold.",
//     year: 1954,
//     category: CategoryEnum.ADVENTURE,
//   },
//   {
//     id: "3",
//     createdAt: new Date(),
//     updatedAt: undefined,
//     deletedAt: undefined,
//     title: "The Silmarillion",
//     description:
//       "The Silmarillion is a collection of tales set in the world of Arda, written by J. R. R. Tolkien. The book was published in 1977, seven years after Tolkien's death, and is based on notes and unfinished drafts left by the author after the publication of The Lord of the Rings. The Silmarillion is a collection of myths and legends about the First Age of Middle-earth, and the events that led up to the writing of The Lord of the Rings.",
//     year: 1977,
//     category: CategoryEnum.ADVENTURE,
//   },
//   {
//     id: "4",
//     createdAt: new Date(),
//     updatedAt: undefined,
//     deletedAt: undefined,
//     title: "The Fellowship of the Ring",
//     description:
//       "The Fellowship of the Ring is the first volume of J. R. R. Tolkien's epic high fantasy novel The Lord of the Rings. It is followed by The Two Towers and The Return of the King. The Fellowship of the Ring was named 1954 British Book of the Year and was awarded a prize from the New York Herald Tribune for best fiction. It is the first part of Tolkien's The Lord of the Rings, followed by The Two Towers and The Return of the King.",
//     year: 1954,
//     category: CategoryEnum.ADVENTURE,
//   },
// ];

const getBooks = (
    parent: unknown,
    args: unknown,
    context: ResolverContext
): Promise<Book[]> => {
    return context.orm.book.findMany()
}

const getBook = (
    parent: unknown,
    args: unknown,
    context: ResolverContext
): Promise<Book | null> => {
    const { id } = args as { id: string }
    const book = context.orm.book.findUnique({
        where: {
            id,
        },
    })
    return book
}

const createBook = (
    parent: unknown,
    arg: unknown,
    context: ResolverContext
): Promise<Book> => {
    const { title, description, year, category, authorId } = arg as Book
    const book = context.orm.book.create({
        data: {
            title,
            description,
            year,
            category,
            authorId,
        },
    })
    return book
}

const updateBook = (
    parent: unknown,
    arg: unknown,
    context: ResolverContext
): Promise<Book> => {
    try {
        const { id } = arg as { id: string }
        if (!id) throw new Error('Book id is required')

        const { title, description, year, category, authorId } = arg as Book
        const updatedBook = context.orm.book.update({
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
        const { id } = arg as { id: string }
        if (!id) throw new Error('Book id is required')
        const deletedBook = context.orm.book.delete({
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
