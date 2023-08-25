import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './components/Home';
import Users from './components/Users';
import User from './components/User';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logoutUser } from './reducers/loginReducer';
import { initializeBlogs } from './reducers/blogReducer';
import NavigationMenu from './components/NavigationMenu';

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
      <div className="App_Navbar">
        {user && (
          <>
            <NavigationMenu />

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
          </>
        )}
      </div>

      <Routes>
        <Route
          path="/users/:id"
          element={user ? <User /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/blogs/:id"
          element={user ? <Blog /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/blogs"
          element={user ? <Home /> : <Navigate replace to="/login" />}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={
            user ? (
              <Navigate replace to="/blogs" />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
      </Routes>
      <Notification />
    </div>
  );
};

export default App;
