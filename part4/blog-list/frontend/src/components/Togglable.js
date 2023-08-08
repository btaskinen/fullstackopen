/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { React, useState, forwardRef, useImperativeHandle } from 'react';
import './Togglable.css';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div className="Togglable">
      <div style={hideWhenVisible}>
        <button className="Togglable_button" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className="Togglable_button" onClick={toggleVisibility}>
          Cancel
        </button>
      </div>
    </div>
  );
});

export default Togglable;
