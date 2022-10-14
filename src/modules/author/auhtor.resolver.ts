import { Author } from "@prisma/client";

const getAuthors = (): Author[] => {
  return authors;
};

const getAuthor = (id: string): Author | null => {
  return authors.find((author) => author.id === id) || null;
};

export {
  getAuthors,
  getAuthor,
};
