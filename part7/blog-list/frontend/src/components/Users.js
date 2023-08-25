import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Users.css';
import { setUsers } from '../reducers/usersReducer';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(setUsers());
  }, []);

  console.log(users);

  return (
    <div className="Users">
      <h2>Users</h2>
      <table className="Users_table">
        <tr>
          <th>Users</th>
          <th>Blogs Created</th>
        </tr>
        {users.map((user, index) => {
          console.log(user.name);
          console.log(user.blogs.length);
          const backgroundColor = index % 2 === 0 ? 'light' : 'dark';
          return (
            <>
              <tr className={`Users_tableRow ${backgroundColor}`}>
                <td>{user.name}</td>
                <td className="Users_blogNumberCell">{user.blogs.length}</td>
              </tr>
            </>
          );
        })}
      </table>
    </div>
  );
};

export default Users;
