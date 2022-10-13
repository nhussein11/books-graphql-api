import * as scalars from '../modules/base/scalar.model';

export default {
  ...scalars,
  Query: {
    getBooks: () => `[Books] This is the API test`,
    getAuthors: () => `[Authors] This is the API test`,
  },
  Mutation: {
    createBook: () => `[Books] This is the API test`,
    createAuthor: () => `[Authors] This is the API test`,
  },
};

