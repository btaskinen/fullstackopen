/* eslint-disable react/prop-types */
import React from 'react';
import './Blogs.css';

const Blogs = ({ storedBlogs, deleteBlog, addLike }) => {
  return (
    <div className="Blogs">
      {storedBlogs.map((blog, index) => {
        console.log(blog.title);
        console.log(blog.author);
        console.log(blog.url);

        const backgroundColor = index % 2 === 0 ? 'dark' : 'light';
        return (
          <div key={blog._id} className={`Blogs_blogEntry ${backgroundColor}`}>
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
            <p>{blog.url}</p>
            <p>
              <strong>Likes:</strong>
            </p>
            <p>{blog.likes}</p>
            <button
              type="button"
              className="Blogs_Button"
              onClick={() => addLike(blog)}
            >
              Like
            </button>
            <button
              type="button"
              onClick={() => deleteBlog(blog)}
              className="Blogs_Button"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Blogs;
