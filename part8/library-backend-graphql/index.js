const { ApolloServer, gql, UserInputError } = require("apollo-server");
const { v1: uuid } = require("uuid");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const Book = require("./Models/book");
const Author = require("./Models/author");

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to MongoDB"))
  .catch((error) => console.log("error connecting to MongoDB:", error.message));

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate("author", {
          name: 1,
          born: 1,
          book: 1,
          id: 1,
        });
      }

      if (args.author && args.genre) {
        //TODO
      }

      if (args.author) {
        //TODO
      }

      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } });
      }
    },
    allAuthors: () => Author.find({}),
  },
  Author: {
    //TODO
  },
  Mutation: {
    addBook: (root, args) => {
      if (books.find((b) => b.title === args.title)) {
        throw new UserInputError("Title must be unique", {
          invalidArgs: args.title,
        });
      }

      const book = { ...args, id: uuid() };
      books = books.concat(book);

      const author = authors.filter(
        (a) => a.name.toLowerCase() === args.author.toLowerCase()
      );

      if (author.length === 0) {
        const newAuthor = {
          name: book.author,
          id: uuid(),
        };

        authors = authors.concat(newAuthor);
      }

      return book;
    },
    editAuthor: (root, args) => {
      const author = authors.find(
        (a) => a.name.toLowerCase() === args.name.toLowerCase()
      );
      if (!author) {
        return null;
      }

      const updatedAuthor = { ...author, born: args.setBornTo };
      authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a));
      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
