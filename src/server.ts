import { ApolloServer } from "apollo-server";
// import { resolvers } from "./graphql/resolvers";
const typeDefs = `

`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
