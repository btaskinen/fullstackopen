/* eslint-disable react/prop-types */
import React from 'react';
import './Form.css';

const Form = ({
  addListEntry,
  handleTitleChange,
  handleAuthorChange,
  handleBlogURLChange,
  newTitle,
  newAuthor,
  newBlogURL,
}) => {
  return (
    <form className="Form" onSubmit={addListEntry}>
      <div className="Form_inputField">
        Title: <input value={newTitle} onChange={handleTitleChange} />
      </div>
      <div className="Form_inputField">
        Author: <input value={newAuthor} onChange={handleAuthorChange} />
      </div>
      <div className="Form_inputField">
        Blog URL: <input value={newBlogURL} onChange={handleBlogURLChange} />
      </div>
      <div className="Form_inputField">
        <button type="submit" className="Form_addButton">
          Add Blog
        </button>
      </div>
    </form>
  );
};

export default Form;
