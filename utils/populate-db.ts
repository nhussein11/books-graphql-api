import { Author, Book, PrismaClient } from '@prisma/client'
import { ResolverContext } from '../src/@types/ResolverContext'

const deleteDatabaseTables = async (orm: ResolverContext['orm']) => {
    await orm.book.deleteMany()
    await orm.author.deleteMany()
}

const populateAuthorTable = async (orm: ResolverContext['orm']) => {
    const authors: Pick<Author, 'name' | 'surname' | 'birth'>[] = [
        {
            name: 'J. R. R.',
            surname: 'Tolkien',
            birth: new Date('1892-01-03'),
        },
        {
            name: 'George',
            surname: 'Martin',
            birth: new Date('1948-09-20'),
        },
        {
            name: 'J. K.',
            surname: 'Rowling',
            birth: new Date('1965-07-31'),
        },
        {
            name: 'Stephen',
            surname: 'King',
            birth: new Date('1947-09-21'),
        },
        {
            name: 'J. D.',
            surname: 'Salinger',
            birth: new Date('1919-01-01'),
        },
        {
            name: 'William',
            surname: 'Shakespeare',
            birth: new Date('1564-04-23'),
        },
        {
            name: 'Charles',
            surname: 'Dickens',
            birth: new Date('1812-02-07'),
        },
    ]
    await orm.author.createMany({ data: authors })
}

const populateBookTable = async (orm: ResolverContext['orm']) => {
    const authors = await orm.author.findMany()
    const books: Pick<Book, 'title' | 'description' | 'year' | 'category'>[] = [
        {
            title: 'The Fellowship of the Ring',
            description:
                "The Fellowship of the Ring is the first volume of J. R. R. Tolkien's epic high fantasy novel The Lord of the Rings. It is followed by The Two Towers and The Return of the King. The Fellowship of the Ring was named 1954 British Book of the Year and was awarded a prize from the New York Herald Tribune for best fiction. It is the first part of Tolkien's The Lord of the Rings, followed by The Two Towers and The Return of the King.",
            year: 1954,
            category: 'ADVENTURE',
        },
        {
            title: 'The Two Towers',
            description:
                "The Two Towers is the second volume of J. R. R. Tolkien's epic high fantasy novel The Lord of the Rings. It is preceded by The Fellowship of the Ring and followed by The Return of the King. The Two Towers was named 1954 British Book of the Year and was awarded a prize from the New York Herald Tribune for best fiction. It is the second part of Tolkien's The Lord of the Rings, preceded by The Fellowship of the Ring and followed by The Return of the King.",
            year: 1954,
            category: 'ADVENTURE',
        },
        {
            title: 'The Return of the King',
            description:
                "The Return of the King is the third and final volume of J. R. R. Tolkien's epic high fantasy novel The Lord of the Rings. It is preceded by The Fellowship of the Ring and The Two Towers. The Return of the King was named 1955 British Book of the Year and was awarded a prize from the New York Herald Tribune for best fiction. It is the third part of Tolkien's The Lord of the Rings, preceded by The Fellowship of the Ring and The Two Towers.",
            year: 1955,
            category: 'ADVENTURE',
        },
        {
            title: 'A Game of Thrones',
            description:
                'A Game of Thrones is the first novel in A Song of Ice and Fire, a series of fantasy novels by American author George R. R. Martin. It was first published on August 1, 1996. The novel won the 1997 Locus Award and was nominated for both the 1997 Nebula Award and the 1997 World Fantasy Award. The novella Blood of the Dragon, comprising the Daenerys Targaryen chapters from the novel, won the 1998 Hugo Award for Best Novella. Martin has described the first volume of the series as the "slow build" to a "big action climax".',
            year: 1996,
            category: 'FANTASY',
        },
        {
            title: 'A Clash of Kings',
            description:
                "A Clash of Kings is the second novel in A Song of Ice and Fire, a series of fantasy novels by American author George R. R. Martin. It was first published on November 16, 1998. The novel was nominated for the 1999 Locus Award and won both the 1999 Nebula Award and the 1999 World Fantasy Award. The novella The Sworn Sword, comprising the first part of the Jon Snow chapters from the novel, won the 2000 Hugo Award for Best Novella. The novel is the second part of Martin's planned seven-part series, following A Game of Thrones and preceding A Storm of Swords.",
            year: 1998,
            category: 'FANTASY',
        },
        {
            title: "Harry Potter and the Philosopher's Stone",
            description:
                "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school, and with the help of his friends, he faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry's parents, but failed to kill Harry when he was just 15 months old.",
            year: 1997,
            category: 'FANTASY',
        },
        {
            title: 'Harry Potter and the Chamber of Secrets',
            description:
                'Harry Potter and the Chamber of Secrets is a fantasy novel written by British author J. K. Rowling and the second novel in the Harry Potter series. The plot follows Harry\'s second year at Hogwarts School of Witchcraft and Wizardry, during which a series of messages on the walls of the school\'s corridors warn that the "Chamber of Secrets" has been opened and that the "heir of Slytherin" would kill all pupils who do not come from all-magical families. These threats are found after attacks which leave residents of the school petrified. Throughout the year, Harry and his friends Ron and Hermione investigate the attacks.',
            year: 1998,
            category: 'FANTASY',
        },
        {
            title: 'Harry Potter and the Prisoner of Azkaban',
            description: 'Harry Potter and the Prisoner of Azkaban is a fantasy novel written by British author J. K. Rowling and the third novel in the Harry Potter series. The book follows Harry Potter, a young wizard, in his third year at Hogwarts School of Witchcraft and Wizardry. Along with friends Ronald Weasley and Hermione Granger, Harry investigates Sirius Black, an escaped prisoner from Azkaban who they believe is one of Lord Voldemort\'s old allies.',
            year: 1999,
            category: 'FANTASY',
        },
        {
            title: 'Harry Potter and the Goblet of Fire',
            description:
                'Harry Potter and the Goblet of Fire is a fantasy novel written by British author J. K. Rowling and the fourth novel in the Harry Potter series. It follows Harry Potter, a wizard in his fourth year at Hogwarts School of Witchcraft and Wizardry, and the mystery surrounding the entry of Harry\'s name into the Triwizard Tournament, in which he is forced to compete.',
            year: 2000,
            category: 'FANTASY',
        }
    ]

    const booksWithAuthorId = authors.map((author, index) => ({
        ...books[index],
        authorId: author.id,
    }))
    await orm.book.createMany({ data: booksWithAuthorId })
}

const populateDatabase = async (orm: ResolverContext['orm']) => {
    await populateAuthorTable(orm)
    await populateBookTable(orm)
}

const main = async () => {
    const orm = new PrismaClient()
    orm.$connect()
    await deleteDatabaseTables(orm)
    await populateDatabase(orm)
    orm.$disconnect()
}

main()
