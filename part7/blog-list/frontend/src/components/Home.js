import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import Blog from './Blog';
import Form from './Form';
import Togglable from './Togglable';
import './Home.css';

const Home = () => {
  const addBlogRef = useRef();
  const storedBlogs = useSelector((state) => state.blogs);

  const arrayForSort = [...storedBlogs];

  const sortedBlogs = arrayForSort.sort((a, b) => (a.likes < b.likes ? 1 : -1));
  return (
    <div className="Home">
      <p>A list of interesting blogs found on the internet.</p>
      <p>
        Fill out the form below and click &quot;Add Blog&quot; to add your
        favorite blog.
      </p>
      <Togglable buttonLabel="Add blog" ref={addBlogRef}>
        <Form addBlogRef={addBlogRef} />
      </Togglable>
      <div className="Home_blogs">
        {sortedBlogs.map((blog, index) => {
          return <Blog key={blog.id} index={index} blog={blog} />;
        })}
      </div>
    </div>
  );
};

export default Home;
