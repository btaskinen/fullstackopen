import React from 'react';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newBlogURL, setNewBlogURL] = useState('');

  const addListEntry = (event) => {
    event.preventDefault();
    console.log(newTitle);
    console.log(newAuthor);
    console.log(newBlogURL);
    setNewAuthor('');
    setNewTitle('');
    setNewBlogURL('');
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleBlogURLChange = (event) => {
    setNewBlogURL(event.target.value);
  };

  return (
    <div className="App">
      <h1>Blog List</h1>
      <p>A list of interesting blogs found on the internet.</p>
      <form onSubmit={addListEntry}>
        <div>
          Title: <input value={newTitle} onChange={handleTitleChange} />
        </div>
        <div>
          Author: <input value={newAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
          Blog URL: <input value={newBlogURL} onChange={handleBlogURLChange} />
        </div>
        <div>
          <button type="submit">Add Blog</button>
        </div>
      </form>
    </div>
  );
};

export default App;
