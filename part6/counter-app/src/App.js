import React from 'react';
import './App.css';
import Display from './components/Display';
import Button from './components/Button';

const App = () => {
  return (
    <div>
      <Display />
      <div>
        <Button type="INCREMENT" label="+" />
        <Button type="DECREMENT" label="-" />
        <Button type="ZERO" label="0" />
      </div>
    </div>
  );
};

export default App;
