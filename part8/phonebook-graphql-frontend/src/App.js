import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Persons from './components/Persons';
import './App.css';
import PersonForm from './components/PersonForm';
import { ALL_PERSONS } from './queries';
import PropType from 'prop-types';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
    </div>
  );
};

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>;
};

Notify.propTypes = {
  errorMessage: PropType.string,
};

export default App;
