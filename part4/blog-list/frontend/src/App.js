import React from 'react';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [newAuthor, setNewAuthor] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newBlogURL, setNewBlogURL] = useState('');

  const addListEntry = (event) => {
    event.preventDefault();
    console.log(newAuthor);
    console.log(newTitle);
    console.log(newBlogURL);
    setNewAuthor('');
    setNewTitle('');
    setNewBlogURL('');
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
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
          Author: <input value={newAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
          Title: <input value={newTitle} onChange={handleTitleChange} />
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
