import React, { useState } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommendations from './components/Recommendations';
import PropType from 'prop-types';
import { useApolloClient } from '@apollo/client';

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  const navigate = useNavigate();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    navigate('/login');
  };

  const handleError = (message) => {
    setErrorMessage(message);
    console.log(token);
    console.log(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
      {token && (
        <div>
          <Link style={{ padding: 5 }} to="/authors">
            Authors
          </Link>
          <Link style={{ padding: 5 }} to="/books">
            Books
          </Link>
          <Link style={{ padding: 5 }} to="/add">
            Add Book
          </Link>
          <Link style={{ padding: 5 }} to="/recommend">
            Recommend
          </Link>
          <button style={{ padding: 5 }} type="button" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      <Notification errorMessage={errorMessage} />

      <Routes>
        <Route
          path="/authors"
          element={
            token ? (
              <Authors setError={handleError} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/books"
          element={token ? <Books /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/add"
          element={
            token ? (
              <NewBook setError={handleError} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/recommend"
          element={
            token ? <Recommendations /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/login"
          element={
            token ? (
              <Navigate replace to="/authors" />
            ) : (
              <LoginForm setError={handleError} setToken={setToken} />
            )
          }
        />
        <Route
          path="/"
          element={
            token ? (
              <Navigate replace to="/authors" />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
};

const Notification = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>;
};

Notification.propTypes = {
  errorMessage: PropType.string,
};

export default App;
