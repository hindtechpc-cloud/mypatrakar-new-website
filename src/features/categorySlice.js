import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetNewsCategories } from "../../api";

// Async thunk to load categories
export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const res = await GetNewsCategories();
      return res.data?.response || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data || "Something went wrong");
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch categories";
      });
  },
});

export default categorySlice.reducer;
