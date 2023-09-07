import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $year: Int!
    $genres: [String!]!
  ) {
    addBook(title: $title, author: $author, published: $year, genres: $genres) {
      title
      author
      published
    }
  }
`;
