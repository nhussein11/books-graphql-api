import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

interface errorHandled {
    name: string
    message: string
}

const errorHandler = (
    error: Error | PrismaClientKnownRequestError | undefined | unknown
) => {
    if (error instanceof Error || error instanceof PrismaClientKnownRequestError) {
        const errorHandled: errorHandled = {
            name: error.name,
            message: error.message,
        }
        throw errorHandled
    }

    const errorHandled = {
        name: 'Something has gone wrong',
    }
    throw errorHandled
}

export { errorHandler }
