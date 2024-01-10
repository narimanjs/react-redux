import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import createBookWithID from '../../utils/createBookWithID';
const initialState = [];

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
    },
    deleteBook: (state, action) => {
      return state.filter(book => book.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      state.forEach(book => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
    },
  },
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;
export const thunkFunction = async (dispatch, getState) => {
  console.log(getState());
  try {
    const res = await axios.get('http://localhost:4000/random-book');
    if (res?.data?.title && res?.data?.author) {
      dispatch(addBook(createBookWithID(res.data, 'via API')));
    }
  } catch (error) {
    console.log('error fetching random book', error);
  }
  console.log(getState());
};

export const selectBooks = state => state.books;

export default booksSlice.reducer;
