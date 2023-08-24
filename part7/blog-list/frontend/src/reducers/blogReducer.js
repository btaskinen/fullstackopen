import { createSlice } from '@reduxjs/toolkit';
import blogServices from '../services/blog-list';
import { setNotification } from './notificationReducer';

const initialState = [];

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      const newState = action.payload;
      state = newState;
      return state;
    },
    appendBlog(state, action) {
      state.push(action.payload);
      return state;
    },
    updateBlog(state, action) {
      const id = action.payload.id;
      state.map((blog) => (blog.id === id ? action.payload : blog));
      return state;
    },
    removeBlog(state, action) {
      state.filter((blog) => blog.id !== action.payload.id);
      return state;
    },
  },
});

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const response = await blogServices.getAllBlogs();
    dispatch(setBlogs(response));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const response = await blogServices.createBlog(blog);
      console.log('CREATE BLOG RESPONSE');
      dispatch(appendBlog(response));
      dispatch(
        setNotification(
          `Blog "${response.title}" was successfully added to the Blog List!`,
          'success',
          5000
        )
      );
      dispatch(initializeBlogs());
    } catch (error) {
      console.log('ERROR', error);
      dispatch(setNotification(`${error.response.data.error}`, 'error', 5000));
    }
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      const response = await blogServices.deleteBlog(blog);
      dispatch(removeBlog(response));
      dispatch(initializeBlogs());
      dispatch(setNotification(`${response}`, 'success', 5000));
    } catch (error) {
      dispatch(setNotification(`${error.response.data.error}`, 'error', 5000));
    }
  };
};

export const addLike = (blog) => {
  const newLikes = blog.likes + 1;
  const updatedBlog = { ...blog, likes: newLikes };
  return async (dispatch) => {
    try {
      const response = await blogServices.updateBlog(blog.id, updatedBlog);
      dispatch(updateBlog(response));
      dispatch(initializeBlogs());
    } catch (error) {
      dispatch(setNotification(`${error.response.data.error}`, 'error', 5000));
    }
  };
};

export default blogSlice.reducer;
