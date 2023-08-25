import { React, useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
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
        <button
          data-cy="Togglable_addBlogButton"
          className="Togglable_button"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button
          data-cy="Togglable_cancelButton"
          className="Togglable_button"
          onClick={toggleVisibility}
        >
          Cancel
        </button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Togglable.displayName = 'Togglable';

export default Togglable;
