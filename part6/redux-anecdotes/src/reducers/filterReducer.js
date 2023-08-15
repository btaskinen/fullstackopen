import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterAnecdotes(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { filterAnecdotes } = filterSlice.actions;
export default filterSlice.reducer;

// const filterReducer = (state = '', action) => {
//   switch (action.type) {
//     case 'FILTER':
//       return action.payload;
//     default:
//       return state;
//   }
// };

// export default filterReducer;
