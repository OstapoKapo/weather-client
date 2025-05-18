import api from '../utils/api';
import { setToken, setBookmarks } from '../store/features/userSlice';
import { AppDispatch } from '../store';

export const addSity = async (dispatch: AppDispatch, city: string) => {
  try {
    const res = await api.post('/user/city', {city});
    const cities = res.data;
    dispatch(setBookmarks(cities));
  } catch (err) {
    console.error('Auth error:', err);
  }
};