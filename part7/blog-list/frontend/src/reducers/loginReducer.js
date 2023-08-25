import { createSlice } from '@reduxjs/toolkit';
import loginServices from '../services/login';
import blogServices from '../services/blog-list';
import { setNotification } from './notificationReducer';

const initialState = {
  user: null,
};
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    removeUserCredentials() {
      return initialState;
    },
    addUserDetails(state, action) {
      const newState = {
        ...state,
        user: action.payload,
      };
      return newState;
    },
  },
});

export const {
  addUsername,
  addPassword,
  removeUserCredentials,
  addUserDetails,
} = loginSlice.actions;

export const setUser = (user) => {
  return (dispatch) => {
    dispatch(addUserDetails(user));
    blogServices.setToken(user.token);
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
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
      dispatch(addUserDetails(user));
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 'error', 5000));
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => dispatch(removeUserCredentials());
};

export default loginSlice.reducer;
