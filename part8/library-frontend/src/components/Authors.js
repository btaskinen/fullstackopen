import React from 'react';
import Author from './Author';
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';

const Authors = () => {
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
            <Author key={a.id} author={a} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;
