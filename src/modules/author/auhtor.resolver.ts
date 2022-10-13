import { Author } from "./author.model";

const authors: Author[] = [
  {
    id: "1",
    createdAt: new Date(),
    updatedAt: undefined,
    deletedAt: undefined,
    name: "J. R. R.",
    surname: "Tolkien",
    birthDate: new Date("1892-01-03"),
  },
  {
    id: "2",
    createdAt: new Date(),
    updatedAt: undefined,
    deletedAt: undefined,
    name: "George",
    surname: "Martin",
    birthDate: new Date("1948-09-20"),
  },
  {
    id: "3",
    createdAt: new Date(),
    updatedAt: undefined,
    deletedAt: undefined,
    name: "J. K.",
    surname: "Rowling",
    birthDate: new Date("1965-07-31"),
  },
];

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
