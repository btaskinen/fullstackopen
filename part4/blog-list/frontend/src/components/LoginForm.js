import React from 'react';
import PropType from 'prop-types';
import './LoginForm.css';

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => (
  <form className="LoginForm" onSubmit={handleLogin}>
    <div className="LoginForm_inputField">
      Username
      <input
        data-cy="usernameInput"
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div className="LoginForm_inputField">
      Password
      <input
        data-cy="passwordInput"
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button className="LoginForm_loginButton" type="submit">
      login
    </button>
  </form>
);

LoginForm.propTypes = {
  username: PropType.string.isRequired,
  setUsername: PropType.func.isRequired,
  password: PropType.string.isRequired,
  setPassword: PropType.func.isRequired,
  handleLogin: PropType.func.isRequired,
};

export default LoginForm;
