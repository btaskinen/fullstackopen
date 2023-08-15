import React from 'react';
import NewNotes from './components/NewNotes';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';

const App = () => {
  return (
    <div>
      <NewNotes />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
