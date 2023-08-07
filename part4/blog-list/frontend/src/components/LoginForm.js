/* eslint-disable react/prop-types */
import React from 'react';
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
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div className="LoginForm_inputField">
      Password
      <input
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

export default LoginForm;
