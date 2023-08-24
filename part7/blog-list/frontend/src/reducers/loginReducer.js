import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  password: '',
  user: null,
};
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    addUsername(state, action) {
      const newState = {
        ...state,
        username: action.payload,
      };
      console.log(action.payload);
      return newState;
    },
    addPassword(state, action) {
      const newState = {
        ...state,
        password: action.payload,
      };
      return newState;
    },
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

export const setUsername = (username) => {
  return (dispatch) => dispatch(addUsername(username));
};

export const setPassword = (password) => {
  return (dispatch) => dispatch(addPassword(password));
};

export const setUser = (user) => {
  return (dispatch) => dispatch(addUserDetails(user));
};

export const logoutUser = () => {
  return (dispatch) => dispatch(removeUserCredentials());
};

export default loginSlice.reducer;
