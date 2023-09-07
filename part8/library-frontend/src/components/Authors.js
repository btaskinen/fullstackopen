import React from 'react';
import PropType from 'prop-types';
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';

const Authors = ({ show }) => {
  if (!show) {
    return null;
  }
  const authors = useQuery(ALL_AUTHORS);

  if (authors.loading) {
    return <div>loading...</div>;
  }

  console.log(authors);

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Authors.propTypes = {
  show: PropType.bool.isRequired,
};

export default Authors;
