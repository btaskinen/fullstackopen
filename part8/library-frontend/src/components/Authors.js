import React from 'react';
import Author from './Author';
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';
import PropType from 'prop-types';

const Authors = ({ setError }) => {
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
            <Author key={a.id} author={a} setError={setError} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

Authors.propTypes = {
  setError: PropType.func.isRequired,
};

export default Authors;
