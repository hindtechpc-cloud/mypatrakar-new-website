import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/categorySlice"
import news_by_categorySlice from "../features/newsByCategorySlice"
export const store=configureStore({
reducer:{
    category:categoryReducer,
    news_by_category:news_by_categorySlice
}
});