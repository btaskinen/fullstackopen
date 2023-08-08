/* eslint-disable react/prop-types */
import React from 'react';
import './Blog.css';

const Blog = ({ index, blog, deleteBlog, addLike }) => {
  const backgroundColor = index % 2 === 0 ? 'dark' : 'light';

  console.log('Inside Blog', blog);

  return (
    <div key={blog._id} className={`Blog ${backgroundColor}`}>
      <p>
        <strong>Title:</strong>
      </p>
      <p>{blog.title}</p>
      <p>
        <strong>Author:</strong>
      </p>
      <p>{blog.author}</p>
      <p>
        <strong>URL:</strong>
      </p>
      <p>
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
  );
};

export default Blog;
