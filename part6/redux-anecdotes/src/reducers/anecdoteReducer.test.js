import anecdoteReducer from './anecdoteReducer';
import deepFreeze from 'deep-freeze';

describe('anecdoteReducer', () => {
  test('returns new state with action ADD_VOTE', () => {
    const state = [
      {
        content: 'Testing the anecdotes',
        votes: 0,
        id: 1,
      },
      {
        content: 'Another test anecdote',
        votes: 0,
        id: 2,
      },
    ];

    const action = {
      type: 'ADD_VOTE',
      payload: {
        id: 2,
      },
    };

    deepFreeze(state);

    const newState = anecdoteReducer(state, action);

    expect(newState).toHaveLength(2);

    expect(newState).toContainEqual(state[0]);

    expect(newState).toContainEqual({
      content: 'Another test anecdote',
      votes: 1,
      id: 2,
    });
  });

  test('returns new state with action ADD_ANECDOTE', () => {
    const state = [];
    const action = {
      type: 'ADD_ANECDOTE',
      payload: {
        content: 'the app state is in redux store',
      },
    };

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual(action.payload);
  });
});
