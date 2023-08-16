import React from 'react';
import { useDispatch } from 'react-redux';
import anecdoteServices from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const newAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const newAnecdote = await anecdoteServices.newAnecdote(content);
    dispatch({ type: 'anecdotes/createAnecdote', payload: newAnecdote });
    dispatch({
      type: 'notification/addNotification',
      payload: `You added the anecdote '${content}'.`,
    });
    setTimeout(
      () => dispatch({ type: 'notification/removeNotification' }),
      5000
    );
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
