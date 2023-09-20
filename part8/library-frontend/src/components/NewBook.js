import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropType from 'prop-types';
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from '../queries';

const NewBook = ({ setError }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const navigate = useNavigate();

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    onError: (error) => {
      const message = error.graphQLErrors[0].message;
      setError(message);
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    const year = Number(published);

    console.log('variables: ', title, author, year, genres);

    createBook({ variables: { title, author, year, genres } });

    navigate('/books');

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

NewBook.propTypes = {
  setError: PropType.func.isRequired,
};

export default NewBook;
