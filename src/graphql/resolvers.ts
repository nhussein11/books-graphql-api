const resolvers = {
  Query: {
    getBooks: () => `[Books] This is the API test`,
    getAuthors: () => `[Authors] This is the API test`,
  },
};

module.exports = resolvers;
