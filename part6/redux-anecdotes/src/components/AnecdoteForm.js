import React from 'react';
import { useDispatch } from 'react-redux';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const newAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch({ type: 'anecdotes/createAnecdote', payload: content });
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
