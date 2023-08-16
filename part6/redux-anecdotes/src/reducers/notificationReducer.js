import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      state = action.payload;
      return state;
    },
    removeNotification(state) {
      state = '';
      return state;
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (message, displayTime) => {
  return (dispatch) => {
    dispatch(addNotification(message));
    setTimeout(() => dispatch(removeNotification()), displayTime);
  };
};
export default notificationSlice.reducer;
