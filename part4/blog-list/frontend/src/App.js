import React from 'react';
import { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import Form from './components/Form';
import blogServices from './services/blog-list';
import './App.css';

const App = () => {
  const [storedBlogs, setStoredBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newBlogURL, setNewBlogURL] = useState('');

  useEffect(() => {
    blogServices.getAllBlogs().then((storedBlogs) => {
      setStoredBlogs(storedBlogs);
    });
  }, []);

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

  console.log(storedBlogs);

  return (
    <div className="App">
      <h1>Blog List</h1>
      <p>A list of interesting blogs found on the internet.</p>
      <Blogs storedBlogs={storedBlogs} />
      <Form
        addListEntry={addListEntry}
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleBlogURLChange={handleBlogURLChange}
        newTitle={newTitle}
        newAuthor={newAuthor}
        newBlogURL={newBlogURL}
      />
    </div>
  );
};

export default App;
