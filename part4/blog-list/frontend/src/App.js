import React from 'react';
import { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import Form from './components/Form';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogServices from './services/blog-list';
import loginServices from './services/login';
import './App.css';

const App = () => {
  const [storedBlogs, setStoredBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newBlogURL, setNewBlogURL] = useState('');
  const [notification, setNotification] = useState(null);
  const [notificationColor, setNotificationColor] = useState('success');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

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

  const addListEntry = (event) => {
    event.preventDefault();
    console.log(newTitle);
    console.log(newAuthor);
    console.log(newBlogURL);
    const urlAlreadyInBlogList = storedBlogs.some(
      (blog) => blog.url === newBlogURL
    );

    if (urlAlreadyInBlogList) {
      console.log('Blog is already in the List.');
      setNotification(`Blog "${newTitle}" is already in the List`);
      setNotificationColor('error');
      setTimeout(() => {
        setNotification(null);
        setNotificationColor('success');
      }, 5000);
      setNewAuthor('');
      setNewTitle('');
      setNewBlogURL('');
    } else {
      const newBlogEntry = {
        title: newTitle,
        author: newAuthor,
        url: newBlogURL,
      };

      blogServices
        .createBlog(newBlogEntry)
        .then((returnedBlog) => {
          setStoredBlogs(storedBlogs.concat(returnedBlog));
          console.log(
            `Blog ${newTitle} was successfully added to the Blog List!`
          );
          setNotification(
            `Blog "${newTitle}" was successfully added to the Blog List!`
          );
          setTimeout(() => {
            setNotification(null);
          }, 5000);
          setNewAuthor('');
          setNewTitle('');
          setNewBlogURL('');
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setNotification(`${error.response.data.error}`);
          setNotificationColor('error');
          setTimeout(() => {
            setNotification(null);
            setNotificationColor('success');
          }, 5000);
        });
    }
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

    blogServices
      .updateBlog(blog.id, updatedBlog)
      .then((returnedBlog) => {
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
      });
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleBlogURLChange = (event) => {
    setNewBlogURL(event.target.value);
  };

  console.log(storedBlogs);

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
          <Form
            addListEntry={addListEntry}
            handleTitleChange={handleTitleChange}
            handleAuthorChange={handleAuthorChange}
            handleBlogURLChange={handleBlogURLChange}
            newTitle={newTitle}
            newAuthor={newAuthor}
            newBlogURL={newBlogURL}
          />
          <Blogs
            storedBlogs={storedBlogs}
            deleteBlog={deleteBlog}
            addLike={addLike}
          />
        </>
      )}
      <Notification message={notification} color={notificationColor} />
    </div>
  );
};

export default App;
