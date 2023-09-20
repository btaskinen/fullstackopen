import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = () => {
  const [filteredBooks, setFilteredBooks] = useState(null);
  const books = useQuery(ALL_BOOKS);

  if (books.loading) {
    return <div>loading...</div>;
  }

  let allGenres = ['all'];

  books.data.allBooks.map((b) => {
    return b.genres.map((g) => allGenres.push(g));
  });

  const filteredGenres = [...new Set(allGenres)];

  const handleFilter = (genre) => {
    if (genre === 'all') {
      setFilteredBooks(books.data.allBooks);
      return;
    }
    const localFilteredBooks = books.data.allBooks.filter((b) =>
      b.genres.includes(genre)
    );
    setFilteredBooks(localFilteredBooks);
  };

  const booksToDisplay = filteredBooks ? filteredBooks : books.data.allBooks;

  console.log(booksToDisplay);

  return (
    <div>
      <h2>books</h2>
      <div>
        {filteredGenres.map((g) => (
          <button
            onClick={() => handleFilter(g)}
            style={{ margin: 3 }}
            key={g}
            type="button"
          >
            {g}
          </button>
        ))}
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToDisplay.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
