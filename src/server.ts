import { ApolloServer } from 'apollo-server'
import * as resolvers from './graphql/resolvers'

import { readFileSync } from 'fs'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const typeDefs = readFileSync(
    path.join(__dirname, 'graphql', 'schema.graphql'),
    'utf8'
)
const orm = new PrismaClient()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        orm,
    },
})

server.listen().then(({ url }) => {
    console.log(`Server is running on ${url}`)
})
