import React, { useState } from 'react';
import PropType from 'prop-types';

const Author = ({ author }) => {
  const [editYear, setEditYear] = useState(false);
  const [year, setYear] = useState('');

  console.log('Value: ', year);

  const setBirthyearHandler = () => {
    console.log(editYear);
    setEditYear((prev) => !prev);
  };

  return (
    <tr key={author.name}>
      <td>{author.name}</td>
      <td>
        {editYear ? (
          <form onSubmit={setYear}>
            <input type="text" value={year} />
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
