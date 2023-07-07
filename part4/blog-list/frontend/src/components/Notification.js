/* eslint-disable react/prop-types */
import React from 'react';
import './Notification.css';

const Notification = ({ message, color }) => {
  if (message === null) {
    return null;
  }

  return <div className={`Notification ${color}`}>{message}</div>;
};

export default Notification;
