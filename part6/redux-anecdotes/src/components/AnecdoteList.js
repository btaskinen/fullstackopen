import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const sortedAnecdotes = anecdotes.sort((a, b) =>
      a.votes < b.votes ? 1 : -1
    );
    if (filter === '') {
      return sortedAnecdotes;
    } else {
      const filteredAnecdotes = sortedAnecdotes.filter((anecdote) => {
        return anecdote.content.includes(filter);
      });
      return filteredAnecdotes;
    }
  });

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
