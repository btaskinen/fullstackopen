import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
  color: 'success',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      state = {
        ...state,
        message: action.payload.message,
        color: action.payload.color,
      };
      return state;
    },
    clearNotification(state) {
      state = { ...state, message: null, color: null };
      return state;
    },
  },
});

export const { addNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (message, color, displayTime) => {
  return (dispatch) => {
    dispatch(addNotification({ message, color }));
    setTimeout(() => dispatch(clearNotification()), displayTime);
  };
};

export default notificationSlice.reducer;
