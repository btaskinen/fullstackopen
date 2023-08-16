import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) => {
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

  console.log(anecdotes);

  const voteButtonHandler = (anecdote) => {
    dispatch(addVote(anecdote));
    dispatch(setNotification(`You voted '${anecdote.content}'.`, 5000));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteButtonHandler(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
