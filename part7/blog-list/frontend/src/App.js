import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './components/Home';
import Users from './components/Users';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logoutUser } from './reducers/loginReducer';
import { initializeBlogs } from './reducers/blogReducer';

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);
  const storedBlogs = useSelector((state) => state.blogs);

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
    }
  }, []);

  console.log('STORED BLOGS', storedBlogs);
  console.log('USER', user);

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
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/" element={user === null ? <LoginForm /> : <Home />} />
      </Routes>
      <Notification />
    </div>
  );
};

export default App;
