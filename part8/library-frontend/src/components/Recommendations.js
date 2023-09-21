import React from 'react';
import Book from './Book';
import { useQuery } from '@apollo/client';
import { ME, ALL_BOOKS } from '../queries';

const Recommendations = () => {
  const favGenre = useQuery(ME);
  const books = useQuery(ALL_BOOKS);

  if (favGenre.loading || books.loading) {
    return <div>loading...</div>;
  }

  console.log(favGenre);
  console.log(favGenre.data.me.favoriteGenre);
  console.log(books.data.allBooks);

  const favBooks = books.data.allBooks.filter((b) => {
    console.log(b.genres);
    return b.genres.includes(favGenre.data.me.favoriteGenre);
  });

  console.log(favBooks);

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        {`Books in your favorite genre: "${favGenre.data.me.favoriteGenre}"`}
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favBooks.map((b) => (
            <Book key={b.title} book={b} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
