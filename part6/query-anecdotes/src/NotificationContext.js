import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NEW':
      return `Anecdote '${action.payload}' was successfully added!`;
    case 'VOTED':
      return `Anecdote '${action.payload}' was voted.`;
    case 'CLEAR':
      return '';
    case 'ERROR':
      return 'Anecdote too short! Must be 5 or more characters long!';
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
