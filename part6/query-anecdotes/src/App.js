import React from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery } from 'react-query';
import { getAnecdotes } from './request';

const App = () => {
  const result = useQuery('anecdotes', () => getAnecdotes(), { retry: 1 });

  const handleVote = (anecdote) => {
    console.log('vote', anecdote);
  };

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.error) {
    return (
      <div>anecdote service not available due to problems in server 😕</div>
    );
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
