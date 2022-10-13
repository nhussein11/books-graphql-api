import { ApolloServer } from "apollo-server";
import * as resolvers from "./graphql/resolvers";

import { readFileSync } from "fs";
import path from "path";

const typeDefs = readFileSync(path.join(__dirname, 'graphql','schema.graphql'), 'utf8')

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});

