import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const newAnecdote = async (content) => {
  console.log('content in newAnecdotes', content);
  const newAnecdote = {
    content: content,
    votes: 0,
  };
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

const updateVotes = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
  console.log('update Votes Response', response.data);
  return response.data;
};

export default { getAll, newAnecdote, updateVotes };
