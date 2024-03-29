import { createStore } from 'redux';

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'ZERO':
      return 0;

    default:
      return state;
  }
};

const store = createStore(counterReducer);

store.subscribe(() => {
  const storeNow = store.getState();
  console.log(storeNow);
});

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'ZERO' });
store.dispatch({ type: 'DECREMENT' });
