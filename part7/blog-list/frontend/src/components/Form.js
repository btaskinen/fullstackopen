import { React, useState } from 'react';
import PropType from 'prop-types';
import './Form.css';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { createBlog } from '../reducers/blogReducer';

const Form = ({ addBlogRef }) => {
  const dispatch = useDispatch();
  const storedBlogs = useSelector((state) => state.blogs);
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
      dispatch(
        setNotification(
          `Blog "${newTitle}" is already in the List`,
          'error',
          5000
        )
      );
    } else {
      dispatch(
        createBlog({
          title: newTitle,
          author: newAuthor,
          url: newBlogURL,
        })
      );
      addBlogRef.current.toggleVisibility();
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
  addBlogRef: PropType.object.isRequired,
};

export default Form;
