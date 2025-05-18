import api from '../utils/api';
import { setToken, setBookmarks } from '../store/features/userSlice';
import { AppDispatch } from '../store';

export const initUser = async (dispatch: AppDispatch) => {
  try {
    const res = await api.get('/auth/init');
    const { user } = res.data;
    dispatch(setToken(user.identifier));
    dispatch(setBookmarks(user.bookmarks));
  } catch (err) {
    console.error('Auth error:', err);
  }
};