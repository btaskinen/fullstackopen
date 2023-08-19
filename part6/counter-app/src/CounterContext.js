import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

const CounterContext = createContext();

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

export const CounterContextProvider = ({ children }) => {
  const [counter, counterDispatch] = useReducer(counterReducer, 0);

  return (
    <CounterContext.Provider value={[counter, counterDispatch]}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounterValue = () => {
  const counterAndDispatch = useContext(CounterContext);
  return counterAndDispatch[0];
};

export const useCounterDispatch = () => {
  const counterAndDispatch = useContext(CounterContext);
  return counterAndDispatch[1];
};

CounterContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CounterContext;
