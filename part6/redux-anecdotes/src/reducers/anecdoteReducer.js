import { createSlice } from '@reduxjs/toolkit';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload;
      console.log('ID: ', id);
      const votedAnecdote = state.find((anecdote) => anecdote.id === id);
      const changedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== action.payload ? anecdote : changedAnecdote
      );
    },
    createAnecdote(state, action) {
      return [...state, action.payload];
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { addVote, createAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;

// export const vote = (id) => {
//   console.log('vote', id);
//   return {
//     type: 'ADD_VOTE',
//     payload: { id },
//   };
// };

// export const createAnecdote = (newAnecdote) => {
//   return {
//     type: 'ADD_ANECDOTE',
//     payload: {
//       content: newAnecdote,
//       id: getId(),
//       votes: 0,
//     },
//   };
// };

// const anecdoteReducer = (state = initialState, action) => {
//   console.log(state);
//   switch (action.type) {
//     case 'ADD_VOTE': {
//       const id = action.payload.id;
//       console.log('ID: ', id);
//       const votedAnecdote = state.find((anecdote) => anecdote.id === id);
//       console.log(votedAnecdote);
//       const changedAnecdote = {
//         ...votedAnecdote,
//         votes: votedAnecdote.votes + 1,
//       };
//       return state.map((anecdote) =>
//         anecdote.id !== action.payload.id ? anecdote : changedAnecdote
//       );
//     }
//     case 'ADD_ANECDOTE':
//       return [...state, action.payload];

//     default:
//       return state;
//   }
// };

// export default anecdoteReducer;
