import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Form from './components/Form';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogServices from './services/blog-list';
import loginServices from './services/login';
import './App.css';
import Togglable from './components/Togglable';

const App = () => {
  const [storedBlogs, setStoredBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
  const [notificationColor, setNotificationColor] = useState('success');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const addBlogRef = useRef();

  useEffect(() => {
    if (user) {
      blogServices.getAllBlogs().then((storedBlogs) => {
        setStoredBlogs(storedBlogs);
      });
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogServices.setToken(user.token);
    }
  }, []);

  const addListEntry = (blogObject) => {
    blogServices
      .createBlog(blogObject)
      .then((returnedBlog) => {
        console.log('RETURNED BLOG', returnedBlog);
        setStoredBlogs(storedBlogs.concat(returnedBlog));
        console.log(
          `Blog ${blogObject.title} was successfully added to the Blog List!`
        );
        setNotification(
          `Blog "${blogObject.title}" was successfully added to the Blog List!`
        );
        setTimeout(() => {
          setNotification(null);
        }, 5000);
        addBlogRef.current.toggleVisibility();
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setNotification(`${error.response.data.error}`);
        setNotificationColor('error');
        setTimeout(() => {
          setNotification(null);
          setNotificationColor('success');
        }, 5000);
      })
      .then(() => {
        blogServices
          .getAllBlogs()
          .then((storedBlogs) => {
            setStoredBlogs(storedBlogs);
          })
          .then(console.log('FETCHED BLOGS'));
      });
  };

  const deleteBlog = (blog) => {
    console.log(blog);
    if (window.confirm(`Delete ${blog.title}?`)) {
      blogServices
        .deleteBlog(blog)
        .then((response) => {
          setStoredBlogs(
            storedBlogs.filter((storedBlog) => storedBlog.id !== blog.id)
          );
          console.log(`${response}`);
          setNotification(`${response}`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          setNotification(`${error.response.data.error}`);
          setNotificationColor('error');
          setTimeout(() => {
            setNotification(null);
            setNotificationColor('success');
          }, 5000);
        });
    }
  };

  const addLike = (blog) => {
    const newLikes = blog.likes + 1;

    const updatedBlog = {
      ...blog,
      likes: newLikes,
    };

    console.log('UPDATED BLOG BEFORE SENDING', updatedBlog);

    blogServices
      .updateBlog(blog.id, updatedBlog)
      .then((returnedBlog) => {
        console.log(returnedBlog);
        setStoredBlogs(
          storedBlogs.map((blog) => {
            return blog.id !== updatedBlog.id ? blog : returnedBlog;
          })
        );
        console.log('Like was successfully registered');
      })
      .catch((error) => {
        setNotification(`${error.response.data.error}`);
        setNotificationColor('error');
        setTimeout(() => {
          setNotification(null);
          setNotificationColor('success');
        }, 5000);
      })
      .then(() => {
        blogServices
          .getAllBlogs()
          .then((storedBlogs) => {
            setStoredBlogs(storedBlogs);
          })
          .then(console.log('FETCHED BLOGS in LIKES'));
      });
  };

  console.log(storedBlogs);

  const sortedBlogs = storedBlogs.sort((a, b) => (a.likes < b.likes ? 1 : -1));

  const handleLogin = async (event) => {
    event.preventDefault();

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
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setNotificationColor('error');
      setNotification('Wrong username or password');
      setTimeout(() => {
        setNotificationColor('success');
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogListAppUser');
    setUser(null);
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
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </>
      ) : (
        <>
          <p>
            Fill out the form below and click &quot;Add Blog&quot; to add your
            favorite blog.
          </p>
          <Togglable buttonLabel="Add blog" ref={addBlogRef}>
            <Form
              addListEntry={addListEntry}
              storedBlogs={storedBlogs}
              setNotification={setNotification}
              setNotificationColor={setNotificationColor}
            />
          </Togglable>
          <div className="App_blogs">
            {sortedBlogs.map((blog, index) => {
              return (
                <Blog
                  key={blog.id}
                  index={index}
                  blog={blog}
                  deleteBlog={deleteBlog}
                  addLike={addLike}
                  loggedinUser={user.name}
                />
              );
            })}
          </div>
        </>
      )}
      <Notification message={notification} color={notificationColor} />
    </div>
  );
};

export default App;
