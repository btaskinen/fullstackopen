import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import './Blog.css';
import { deleteBlog, addLike } from '../reducers/blogReducer';
import Comments from './Comments';

const Blog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const loggedinUser = useSelector((state) => state.login.user.name);

  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);

  const handleDeleteBlog = (blog) => {
    console.log(blog);
    if (window.confirm(`Delete ${blog.title}?`)) {
      dispatch(deleteBlog(blog));
      navigate('/');
    }
  };

  return (
    <div key={blog.id} className="Blog">
      <div className="Blog_title">
        <p>
          <strong>{blog.title}</strong>
        </p>
      </div>

      <div className="Blog_details">
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
          onClick={() => dispatch(addLike(blog))}
        >
          Like
        </button>
        {blog.user.name === loggedinUser && (
          <button
            data-cy="Blog_deleteButton"
            type="button"
            onClick={() => handleDeleteBlog(blog)}
            className="Blog_Button"
          >
            Delete
          </button>
        )}
      </div>
      <Comments blog={blog} />
    </div>
  );
};

export default Blog;
