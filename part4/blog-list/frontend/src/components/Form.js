import { React, useState } from 'react';
import PropType from 'prop-types';
import './Form.css';

const Form = ({
  addListEntry,
  storedBlogs,
  setNotification,
  setNotificationColor,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newBlogURL, setNewBlogURL] = useState('');

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleBlogURLChange = (event) => {
    setNewBlogURL(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    const urlAlreadyInBlogList = storedBlogs.some(
      (blog) => blog.url === newBlogURL
    );

    if (urlAlreadyInBlogList) {
      console.log('Blog is already in the List.');
      setNotification(`Blog "${newTitle}" is already in the List`);
      setNotificationColor('error');
      setTimeout(() => {
        setNotification(null);
        setNotificationColor('success');
      }, 5000);
    } else {
      addListEntry({
        title: newTitle,
        author: newAuthor,
        url: newBlogURL,
      });
      setNewAuthor('');
      setNewTitle('');
      setNewBlogURL('');
    }
  };

  return (
    <form className="Form" onSubmit={addBlog}>
      <div className="Form_inputField ">
        Title:{' '}
        <input id="titleInput" value={newTitle} onChange={handleTitleChange} />
      </div>
      <div className="Form_inputField">
        Author:{' '}
        <input
          id="authorInput"
          value={newAuthor}
          onChange={handleAuthorChange}
        />
      </div>
      <div className="Form_inputField ">
        Blog URL:{' '}
        <input
          id="urlInput"
          value={newBlogURL}
          onChange={handleBlogURLChange}
        />
      </div>
      <div className="Form_inputField">
        <button type="submit" className="Form_addButton">
          Add Blog
        </button>
      </div>
    </form>
  );
};

Form.propTypes = {
  addListEntry: PropType.func.isRequired,
  storedBlogs: PropType.array.isRequired,
  setNotification: PropType.func.isRequired,
  setNotificationColor: PropType.func.isRequired,
};

export default Form;
