/* eslint-disable indent */
import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const style =
    notification === ''
      ? {}
      : {
          border: 'solid',
          padding: 10,
          borderWidth: 1,
          marginBottom: 10,
        };

  return <div style={style}>{notification}</div>;
};

export default Notification;
