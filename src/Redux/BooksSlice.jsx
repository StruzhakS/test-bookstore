import { createSlice } from '@reduxjs/toolkit';
import { books } from './initialState';
const booksSlice = createSlice({
  name: 'books',
  initialState: {
    items: books,
  },
  reducers: {
    addBook: (state, { payload }) => {
      state.items = [...state.items, payload];
    },
    deleteBook: (state, { payload }) => {
      state.items = state.items.filter(el => el.id !== payload);
    },
    changeBookAction: (state, { payload }) => {
      const finIndexChangesBook = state.items.findIndex(el => el.id === payload.id);
      state.items[finIndexChangesBook] = payload;
    },
  },
});

export const { actions } = booksSlice;
export const { addBook, deleteBook, changeBookAction } = booksSlice.actions;
export default booksSlice.reducer;
