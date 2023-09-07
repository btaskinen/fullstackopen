import React, { useState } from 'react';
import PropType from 'prop-types';
import { useMutation } from '@apollo/client';
import { EDIT_BIRTHYEAR } from '../queries';

const Author = ({ author }) => {
  const [editYear, setEditYear] = useState(false);
  const [year, setYear] = useState('');

  const [changeBirthyear] = useMutation(EDIT_BIRTHYEAR);

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
};

export default Author;
