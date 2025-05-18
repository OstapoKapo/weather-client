import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string | null;
  bookmarks: string[];
}

const initialState: UserState = {
  token: null,
  bookmarks: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setBookmarks(state, action: PayloadAction<string[]>) {
      state.bookmarks = action.payload;
    },
    addBookmark(state, action: PayloadAction<string>) {
      if (!state.bookmarks.includes(action.payload)) {
        state.bookmarks.push(action.payload);
      }
    },
  },
});

export const { setToken, setBookmarks, addBookmark } = userSlice.actions;
export default userSlice.reducer;
