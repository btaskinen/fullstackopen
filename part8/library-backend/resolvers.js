const { GraphQLError } = require('graphql');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const jwt = require('jsonwebtoken');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return await Book.find({}).populate('author', 'name id born');
      }

      // if (args.author && !args.genre) {
      //   return await Book.find({})
      //     .populate('author', 'name id born')
      //     .find({ 'author.name': args.author });
      // }

      if (!args.author && args.genre) {
        return await Book.find({ genres: args.genre });
      }
      // if (args.author && args.genre) {
      //   books.forEach((book) => {
      //     if (
      //       book.genres.some((genre) => genre === args.genre) &&
      //       book.author === args.author
      //     )
      //       returnedBooks.push(book);
      //   });
      // }

      // return returnedBooks;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addAuthor: async (root, args, context) => {
      const authors = await Author.find({});
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      if (authors.find((a) => a.name === args.name)) {
        throw new GraphQLError('Author already in list!', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
          },
        });
      }
      const author = new Author({ ...args });
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
      }
      return author;
    },
    addBook: async (root, args, context) => {
      const existingAuthor = await Author.findOne({ name: args.author });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      if (!existingAuthor) {
        const newAuthor = new Author({ name: args.author });
        try {
          await newAuthor.save();
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          });
        }
      }

      const author = existingAuthor
        ? existingAuthor
        : await Author.findOne({ name: args.author });

      const book = new Book({
        title: args.title,
        author: author,
        published: args.published,
        genres: args.genres,
      });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error,
          },
        });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      const authorToEdit = await Author.findOne({ name: args.name });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      if (!authorToEdit) return null;
      authorToEdit.born = args.setBornTo;

      try {
        await authorToEdit.save();
      } catch (error) {
        throw new GraphQLError('Saving number failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
      }
      return authorToEdit;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({
        username: args.username,
      });

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      const userForToken = {
        username: user.username,
        favoriteGenre: user.favoriteGenre,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
};

module.exports = resolvers;
