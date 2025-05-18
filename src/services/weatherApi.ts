// services/weatherApi.ts
import axios from 'axios'; 
import {weatherResponse} from '@/types';



export const getWeatherByCity = async (city: string): Promise<weatherResponse> => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
        const response = await axios.get(`${url}weather/forecast?city=${city}`);
    
        return response.data;
      } catch (error: any) {
        if (error.response && error.response.status === 500) {
          alert('Sorry, we can not find this city');
        } else {
          alert('An error occurred while fetching weather data');
        }
        throw error; // Можеш кидати помилку далі або повертати дефолт
      }
};

export const getCityByCoords = async (lat: number, lon: number) => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.get(`${url}weather/city?lat=${lat}&lon=${lon}`);
    return response.data[0]?.name;
   
};

export const fetchCities = async (query: string) => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.get(`${url}weather/fetchCities?query=${query}`);
    return response.data;
}
