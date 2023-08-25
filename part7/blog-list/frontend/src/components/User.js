import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './User.css';

const User = () => {
  const users = useSelector((state) => state.users);
  const id = useParams().id;
  console.log(id);
  const user = users.find((user) => {
    console.log(user.id);
    if (user.id === id) return user;
  });

  console.log(user);

  if (!user) {
    return null;
  }

  return (
    <div className="User">
      <h2>{user.name}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {user.blogs.map((blog, index) => {
          const backgroundColor = index % 2 === 0 ? 'light' : 'dark';
          return (
            <li className={`User_blog ${backgroundColor}`} key={blog.id}>
              <Link className="User_link" to={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default User;
