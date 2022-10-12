import { ApolloServer } from "apollo-server";

const typeDefs = `
    type Book {
        title: String
        description: String
        year: Int
        category: Category
    }
    enum Category {
        ADVENTURE
        HORROR
        SCIENCE_FICTION
        ROMANCE
    }
    type Author {
        name: String
        surname: String
        books: [Book]
    }
    type Query {
        getBooks: [Book]!
        getAuthors: [Author]!
    }
`;

const resolvers = {
  Query: {
    getBooks: () => `This is the API test`,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
