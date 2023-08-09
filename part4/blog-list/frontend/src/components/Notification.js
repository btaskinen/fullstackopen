import React from 'react';
import PropType from 'prop-types';
import './Notification.css';

const Notification = ({ message, color }) => {
  if (message === null) {
    return null;
  }

  return <div className={`Notification ${color}`}>{message}</div>;
};

Notification.propTypes = {
  message: PropType.string,
  color: PropType.string.isRequired,
};

export default Notification;
