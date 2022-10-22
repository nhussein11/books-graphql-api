import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

interface errorHandled {
    name: string
    message: string
}

const commonPrismaErrors = {
    P2000: "The provided value for the column is too long for the column's type",
    P2001: 'The record searched for in the where condition does not exist',
    P2002: 'Unique constraint failed',
    P2003: 'Foreign key constraint failed',
    P2004: 'A constraint failed on the database',
    P2005: "The value {field_value} stored in the database for the field {field_name} is invalid for the field's",
    P2006: 'The provided value for certain field is not valid',
    P2007: 'Data validation error ',
    P2008: 'Failed to parse the query',
}

const errorHandler = (
    error: Error | PrismaClientKnownRequestError | undefined | any
) => {
    if (error instanceof Error) {
        const errorHandled: errorHandled = {
            name: error.name,
            message: error.message,
        }
        return errorHandled
    }
    if (error instanceof PrismaClientKnownRequestError) {
        const errorHandled: errorHandled = {
            name: 'Something has gone wrong',
            message: commonPrismaErrors[error.code],
        }
        return errorHandled
    }

    const errorHandled: Omit<errorHandled, 'message'> = {
        name: 'Something has gone wrong',
    }
    return errorHandled
}

exports = { errorHandler }
