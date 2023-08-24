import React from 'react';
import PropType from 'prop-types';
import './LoginForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, setPassword } from '../reducers/loginReducer';

const LoginForm = ({ handleLogin }) => {
  const dispatch = useDispatch();
  const { username, password } = useSelector((state) => state.login);
  return (
    <form className="LoginForm" onSubmit={handleLogin}>
      <div className="LoginForm_inputField">
        Username
        <input
          data-cy="usernameInput"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => dispatch(setUsername(target.value))}
        />
      </div>
      <div className="LoginForm_inputField">
        Password
        <input
          data-cy="passwordInput"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => dispatch(setPassword(target.value))}
        />
      </div>
      <button className="LoginForm_loginButton" type="submit">
        login
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropType.func.isRequired,
};

export default LoginForm;
