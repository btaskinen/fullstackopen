/* eslint-disable react/prop-types */
import { React, useState } from 'react';
import './Blog.css';

const Blog = ({ index, blog, deleteBlog, addLike }) => {
  const [blogDetailsVisible, setVisibility] = useState(false);
  const backgroundColor = index % 2 === 0 ? 'dark' : 'light';

  const handleVisibility = () => {
    setVisibility(!blogDetailsVisible);
  };

  const displayDetails = { display: blogDetailsVisible ? '' : 'none' };
  const buttonLabel = blogDetailsVisible ? 'Hide' : 'View';

  console.log('Inside Blog', blog);

  return (
    <div key={blog._id} className={`Blog ${backgroundColor}`}>
      <div className="Blog_title">
        <p>
          <strong>{blog.title}</strong>
        </p>
        <button
          className="Blog_Button Blog_viewButton"
          onClick={handleVisibility}
        >
          {buttonLabel}
        </button>
      </div>

      <div className="Blog_details" style={displayDetails}>
        <p>
          <strong>Author:</strong>
        </p>
        <p className="Blog_authorValue">{blog.author}</p>
        <p>
          <strong>URL:</strong>
        </p>
        <p className="Blog_urlValue">
          <a href={blog.url}>{blog.url}</a>
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
