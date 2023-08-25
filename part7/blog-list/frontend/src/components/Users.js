import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Users.css';
import { setUsers } from '../reducers/usersReducer';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(setUsers());
  }, []);

  return (
    <div className="Users">
      <h2>Users</h2>
      <table className="Users_table">
        <tr>
          <th>Users</th>
          <th>Blogs Created</th>
        </tr>
        {users.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? 'light' : 'dark';
          return (
            <tr key={user.id} className={`Users_tableRow ${backgroundColor}`}>
              <td>
                <Link className="Users_link" to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td className="Users_blogNumberCell">{user.blogs.length}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Users;
