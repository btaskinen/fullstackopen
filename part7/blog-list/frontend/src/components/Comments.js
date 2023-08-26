import React, { useState } from 'react';
import PropType from 'prop-types';
import { useDispatch } from 'react-redux';
import { addComment } from '../reducers/blogReducer';
import './Comments.css';

const Comments = ({ blog }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const handleAddComment = async (event) => {
    event.preventDefault();
    console.log(comment);
    await dispatch(addComment(blog, comment));
    setComment('');
  };
  return (
    <div className="Comments">
      <h3>Comments</h3>
      {blog.comments.map((comment, index) => {
        const backgroundColor = index % 2 === 0 ? 'dark' : 'light';
        return (
          <div
            key={comment.id}
            className={`Comments_comment ${backgroundColor}`}
          >
            {comment.comment}
          </div>
        );
      })}
      <form onSubmit={handleAddComment}>
        <div className="Comments_inputField">
          <input
            type="text"
            value={comment}
            name="Comment"
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button className="Comments_addButton" type="submit">
          add Comment
        </button>
      </form>
    </div>
  );
};

Comments.propTypes = {
  blog: PropType.object.isRequired,
};

export default Comments;
