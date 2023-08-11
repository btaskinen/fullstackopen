import { React, useState } from 'react';
import PropTypes from 'prop-types';
import './Blog.css';

const Blog = ({ index, blog, deleteBlog, addLike, loggedinUser }) => {
  const [blogDetailsVisible, setVisibility] = useState(false);
  const backgroundColor = index % 2 === 0 ? 'dark' : 'light';

  const handleVisibility = () => {
    setVisibility(!blogDetailsVisible);
  };

  const displayDetails = { display: blogDetailsVisible ? '' : 'none' };
  const buttonLabel = blogDetailsVisible ? 'Hide' : 'View';

  return (
    <div key={blog._id} className={`Blog ${backgroundColor}`}>
      <div className="Blog_title">
        <p>
          <strong>{blog.title}</strong>
        </p>
        <button
          className="Blog_Button Blog_toggleButton"
          onClick={handleVisibility}
        >
          {buttonLabel}
        </button>
      </div>

      <div className="Blog_details" style={displayDetails}>
        <p>
          <strong>Author:</strong>
        </p>
        <p className="Blog_value Blog_author">{blog.author}</p>
        <p>
          <strong>URL:</strong>
        </p>
        <p className="Blog_value Blog_url">
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          <strong>Add by User:</strong>
        </p>
        <p className="Blog_value Blog_user">{blog.user.name}</p>
        <p>
          <strong>Likes:</strong>
        </p>
        <p className="Blog_likes">{blog.likes}</p>
        <button
          type="button"
          className="Blog_Button Blog_likeButton"
          onClick={() => addLike(blog)}
        >
          Like
        </button>
        {blog.user.name === loggedinUser && (
          <button
            data-cy="Blog_deleteButton"
            type="button"
            onClick={() => deleteBlog(blog)}
            className="Blog_Button"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  index: PropTypes.number.isRequired,
  blog: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  loggedinUser: PropTypes.string.isRequired,
};

export default Blog;
