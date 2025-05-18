import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`, // змінити на свою адресу бекенду
  withCredentials: true, // якщо токен у cookie
});

export default api;