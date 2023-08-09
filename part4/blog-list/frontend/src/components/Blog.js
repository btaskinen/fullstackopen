/* eslint-disable react/prop-types */
import { React, useState } from 'react';
import './Blog.css';

const Blog = ({ index, blog, deleteBlog, addLike, user }) => {
  const [blogDetailsVisible, setVisibility] = useState(false);
  const backgroundColor = index % 2 === 0 ? 'dark' : 'light';

  const handleVisibility = () => {
    setVisibility(!blogDetailsVisible);
  };

  const displayDetails = { display: blogDetailsVisible ? '' : 'none' };
  const buttonLabel = blogDetailsVisible ? 'Hide' : 'View';

  console.log('Inside Blog', blog.user.name);

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
        <p className="Blog_value">{blog.author}</p>
        <p>
          <strong>URL:</strong>
        </p>
        <p className="Blog_value">
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          <strong>Add by User:</strong>
        </p>
        <p className="Blog_value">
          {blog.user.name ? blog.user.name : user.name}
        </p>
        <p>
          <strong>Likes:</strong>
        </p>
        <p>{blog.likes}</p>
        <button
          type="button"
          className="Blog_Button"
          onClick={() => addLike(blog)}
        >
          Like
        </button>
        <button
          type="button"
          onClick={() => deleteBlog(blog)}
          className="Blog_Button"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Blog;
