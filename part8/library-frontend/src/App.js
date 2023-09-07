import React, { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import PropType from 'prop-types';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
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
      </div>
      <Notification errorMessageessage={errorMessage} />

      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook setError={handleError} />} />
        <Route path="/" element={<Navigate replace to="/authors" />} />
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
