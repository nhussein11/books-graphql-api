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
    P2009: 'Failed to validate the query',
    P2010: 'Raw query failed',
    P2011: 'Null constraint violation',
    P2012: 'Missing a required value',
    P2013: 'Missing a required argument',
    P2014: 'The change you are trying to make would violate a required relation',
    P2015: 'A related record could not be found',
}

const errorHandler = (
    error: Error | PrismaClientKnownRequestError | undefined | any
) => {
    if (error instanceof Error) {
        const errorHandled: errorHandled = {
            name: error.name,
            message: error.message,
        }
        throw errorHandled
    }

    if (error instanceof PrismaClientKnownRequestError) {
        const errorHandled: errorHandled = {
            name: 'Something has gone wrong',
            message: commonPrismaErrors[error.code],
        }
        throw errorHandled
    }

    const errorHandled = {
        name: 'Something has gone wrong',
    }
    throw errorHandled
}

export { errorHandler }
