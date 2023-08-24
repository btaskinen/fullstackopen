import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import loginReducer from './reducers/loginReducer';
import blogReducer from './reducers/blogReducer';

const store = configureStore({
  reducer: {
    login: loginReducer,
    notification: notificationReducer,
    blogs: blogReducer,
  },
});

export default store;
