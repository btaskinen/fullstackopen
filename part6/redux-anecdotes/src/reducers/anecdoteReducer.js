import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    updateAnecdote(state, action) {
      console.log('updateAnecdote reducer', action);
      const id = action.payload.id;
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : action.payload
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnecdote, updateAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.newAnecdote(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const addVote = (anecdote) => {
  const changedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1,
  };
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateVotes(changedAnecdote);
    console.log(
      'addVote anecdoteReducer',
      JSON.parse(JSON.stringify(updatedAnecdote))
    );
    dispatch(updateAnecdote(updatedAnecdote));
  };
};

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
