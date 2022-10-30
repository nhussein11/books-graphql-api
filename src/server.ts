import { ApolloServer } from 'apollo-server-express'
import * as resolvers from './graphql/resolvers'

import { readFileSync } from 'fs'
import path from 'path'
import express from 'express'
import http from 'http'

import { PrismaClient } from '@prisma/client'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'

const typeDefs = readFileSync(
    // eslint-disable-next-line no-undef
    path.join(__dirname, 'graphql', 'schema.graphql'),
    'utf8'
)
const orm = new PrismaClient()

!(async function () {
    console.log(path.join(__dirname, 'public'))
    const app = express()
    const httpServer = http.createServer(app)

    app.use('/static', express.static(path.join(__dirname, 'public')))

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: {
            orm,
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    })

    await server.start()
    server.applyMiddleware({
        app,
        path: '/graphql',
    })

    await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))

    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})()