// services/weatherApi.ts
import axios from 'axios'; 
import {weatherResponse} from '@/types';

export const getWeatherByCity = async (city: string): Promise<weatherResponse> => {
  const response = await axios.get(`http://localhost:8000/weather/forecast?city=${city}`);
  return response.data;
};

export const getCityByCoords = async (lat: number, lon: number) => {
    const response = await axios.get(`http://localhost:8000/weather/city?lat=${lat}&lon=${lon}`);
    return response.data[0]?.name;
   
};

export const fetchCities = async (query: string) => {
    const response = await axios.get(`http://localhost:8000/weather/fetchCities?query=${query}`);
    return response.data;
}
