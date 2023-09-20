import React, { useState } from 'react';
import PropType from 'prop-types';
import { useMutation } from '@apollo/client';
import { EDIT_BIRTHYEAR, ALL_AUTHORS } from '../queries';

const Author = ({ author, setError }) => {
  const [editYear, setEditYear] = useState(false);
  const [year, setYear] = useState('');

  const [changeBirthyear] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const message = error.graphQLErrors[0].message;
      setError(message);
    },
  });

  const setBirthyearHandler = () => {
    console.log(editYear);
    setEditYear((prev) => !prev);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(year);

    const setBornTo = Number(year);

    changeBirthyear({ variables: { name: author.name, setBornTo } });

    setEditYear(false);
    setYear('');
  };

  return (
    <tr key={author.name}>
      <td>{author.name}</td>
      <td>
        {editYear ? (
          <form onSubmit={submitHandler}>
            <input
              type="text"
              value={year}
              onChange={({ target }) => setYear(target.value)}
            />
            <button type="submit">submit</button>
          </form>
        ) : (
          author.born
        )}
      </td>
      <td>
        <button onClick={setBirthyearHandler}>set birthyear</button>
      </td>
    </tr>
  );
};

Author.propTypes = {
  author: PropType.object.isRequired,
  setError: PropType.func.isRequired,
};

export default Author;
