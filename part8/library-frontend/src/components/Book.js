import React from 'react';
import PropType from 'prop-types';

const Book = ({ book }) => {
  return (
    <tr>
      <td>{book.title}</td>
      <td>{book.author.name}</td>
      <td>{book.published}</td>
    </tr>
  );
};

Book.propTypes = {
  book: PropType.object.isRequired,
};

export default Book;
