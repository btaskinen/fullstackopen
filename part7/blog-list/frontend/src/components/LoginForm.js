import React, { useState } from 'react';
import './LoginForm.css';
import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/loginReducer';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    console.log('USERNAME AND PASSWORD', username, password);
    await dispatch(loginUser(username, password));
    setUsername('');
    setPassword('');
    navigate('/blogs');
  };

  return (
    <>
      <p>A list of interesting blogs found on the internet.</p>
      <p>Login with your credentials to see and create blog listings.</p>

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
    </>
  );
};

export default LoginForm;
