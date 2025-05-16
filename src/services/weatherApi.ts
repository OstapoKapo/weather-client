// services/weatherApi.ts
import axios from 'axios'; 
import {weatherResponse} from '@/types';

const url = process.env.NEXT_PUBLIC_API_URL;


export const getWeatherByCity = async (city: string): Promise<weatherResponse> => {
    console.log(url)
    const response = await axios.get(`${url}weather/forecast?city=${city}`);
    return response.data;
};

export const getCityByCoords = async (lat: number, lon: number) => {
    const response = await axios.get(`${url}weather/city?lat=${lat}&lon=${lon}`);
    return response.data[0]?.name;
   
};

export const fetchCities = async (query: string) => {
    const response = await axios.get(`${url}weather/fetchCities?query=${query}`);
    return response.data;
}
