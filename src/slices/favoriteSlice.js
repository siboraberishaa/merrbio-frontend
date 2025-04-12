import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('favorite')
  ? JSON.parse(localStorage.getItem('favorite'))
  : { favoriteItems: [] };

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      const { user, ...item } = action.payload;

      const existItem = state.favoriteItems.find((x) => x._id === item._id);

      if (!existItem) {
        state.favoriteItems = [...state.favoriteItems, item];
      }

      localStorage.setItem('favorite', JSON.stringify(state));
    },

    removeFromFavorite: (state, action) => {
      state.favoriteItems = state.favoriteItems.filter((x) => x._id !== action.payload);
      localStorage.setItem('favorite', JSON.stringify(state));
    },

    clearFavoriteItems: (state, action) => {
      state.favoriteItems = [];
      localStorage.setItem('favorite', JSON.stringify(state));
    },

    resetFavorite: (state) => {
      state.favoriteItems = initialState.favoriteItems;
      localStorage.setItem('favorite', JSON.stringify(state));
    },
  },
});

export const {
  addToFavorite,
  removeFromFavorite,
  clearFavoriteItems,
  resetFavorite,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
