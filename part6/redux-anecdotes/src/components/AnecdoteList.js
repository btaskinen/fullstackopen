import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    console.log('inside AnecdoteList');
    const copyOfAnecdotes = [...anecdotes];
    const sortedAnecdotes = copyOfAnecdotes.sort((a, b) =>
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
            <button
              onClick={() =>
                dispatch({ type: 'anecdotes/addVote', payload: anecdote.id })
              }
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
