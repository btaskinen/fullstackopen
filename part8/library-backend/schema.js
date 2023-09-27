const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
  }
  type Book {
    title: String!
    author: Author!
    published: Int!
    id: ID!
    genres: [String!]!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int
    authorCount: Int
    allAuthors: [Author]
    allBooks(author: String, genre: String): [Book]
    me: User
  }
  type Mutation {
    addAuthor(
      name: String!
      born: Int
    ): Author
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`;

module.exports = typeDefs;
