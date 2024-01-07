import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './books/reducer';
const store = configureStore({
  reducer: {
    book: booksReducer,
  },
});

export default store;
