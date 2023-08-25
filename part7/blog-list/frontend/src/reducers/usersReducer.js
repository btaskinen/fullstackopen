import { createSlice } from '@reduxjs/toolkit';
import usersServices from '../services/users';

const initialState = [];

const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsers(state, action) {
      const newState = action.payload;
      return newState;
    },
  },
});

export const { addUsers } = UsersSlice.actions;

export const setUsers = () => {
  return async (dispatch) => {
    const users = await usersServices.getAllUsers();
    dispatch(addUsers(users));
  };
};

export default UsersSlice.reducer;
