import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createAnecdote } from '../request';
import { useNotificationDispatch } from '../NotificationContext';

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote));
    },
    onError: () => {
      dispatch({ type: 'ERROR' });
      setTimeout(() => dispatch({ type: 'CLEAR' }), 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    console.log('new anecdote', content);
    newAnecdoteMutation.mutate({ content, votes: 0 });
    dispatch({ type: 'NEW', payload: content });
    setTimeout(() => dispatch({ type: 'CLEAR' }), 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
