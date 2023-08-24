import React from 'react';
import { useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Form from './components/Form';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogServices from './services/blog-list';
import loginServices from './services/login';
import './App.css';
import Togglable from './components/Togglable';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import {
  setUser,
  logoutUser,
  setUsername,
  setPassword,
} from './reducers/loginReducer';
import { initializeBlogs, createBlog } from './reducers/blogReducer';

const App = () => {
  const dispatch = useDispatch();
  const { username, password, user } = useSelector((state) => state.login);
  const storedBlogs = useSelector((state) => state.blogs);

  const addBlogRef = useRef();

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogServices.setToken(user.token);
    }
  }, []);

  const addListEntry = (blogObject) => {
    dispatch(createBlog(blogObject));
  };

  console.log('STORED BLOGS', storedBlogs);
  console.log('USER', user);

  const arrayForSort = [...storedBlogs];

  const sortedBlogs = arrayForSort.sort((a, b) => (a.likes < b.likes ? 1 : -1));

  const handleLogin = async (event) => {
    event.preventDefault();

    console.log('USERNAME AND PASSWORD', username, password);

    try {
      const user = await loginServices.login({
        username,
        password,
      });
      window.localStorage.setItem(
        'loggedBlogListAppUser',
        JSON.stringify(user)
      );
      blogServices.setToken(user.token);
      dispatch(setUser(user));
      dispatch(setUsername(''));
      dispatch(setPassword(''));
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 'error', 5000));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogListAppUser');
    dispatch(logoutUser());
  };

  return (
    <div className="App">
      <h1>Blog List</h1>
      {user && (
        <div className="App_loggedInUser">
          <p>{user.name} is logged in.</p>
          <button
            className="App_logoutButton"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
      <p>A list of interesting blogs found on the internet.</p>
      {user === null ? (
        <>
          <p>Login with your credentials to see and create blog listings.</p>
          <LoginForm handleLogin={handleLogin} />
        </>
      ) : (
        <>
          <p>
            Fill out the form below and click &quot;Add Blog&quot; to add your
            favorite blog.
          </p>
          <Togglable buttonLabel="Add blog" ref={addBlogRef}>
            <Form addListEntry={addListEntry} />
          </Togglable>
          <div className="App_blogs">
            {sortedBlogs.map((blog, index) => {
              return <Blog key={blog.id} index={index} blog={blog} />;
            })}
          </div>
        </>
      )}
      <Notification />
    </div>
  );
};

export default App;
