import React from 'react';
import './Notification.css';
import { useSelector } from 'react-redux';

const Notification = () => {
  const { message, color } = useSelector((state) => state.notification);
  if (message === null) {
    return null;
  }

  return (
    <div data-cy="notification" className={`Notification ${color}`}>
      {message}
    </div>
  );
};

export default Notification;
