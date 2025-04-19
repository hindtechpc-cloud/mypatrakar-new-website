// src/redux/newsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    selectedNews: null,
  },
  reducers: {
    setSelectedNews: (state, action) => {
      state.selectedNews = action.payload;
    },
  },
});

export const { setSelectedNews } = newsSlice.actions;
export default newsSlice.reducer;
