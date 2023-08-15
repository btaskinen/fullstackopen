import { createSlice } from '@reduxjs/toolkit';

const initialState = 'This is a notification';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeNotification(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { changeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
