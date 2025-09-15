// src/features/categorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadNewsByCategory } from "../../api";

// Async thunk to load news articles by category
export const fetchNewsByCategories = createAsyncThunk(
  "category/fetchNewsByCategories",
  async (category, thunkAPI) => {
    try {
      const res = await loadNewsByCategory(category);
    //   console.log(res)
      return res.data?.response || [];
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  articles: [],
  loading: false,
  error: null,
};

const news_by_categorySlice = createSlice({
  name: "news_by_category",
  initialState,
  reducers: {
    resetCategoryState: (state) => {
      state.articles = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsByCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsByCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchNewsByCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch categories";
      });
  },
});

export const { resetCategoryState } = news_by_categorySlice.actions;
export default news_by_categorySlice.reducer;
