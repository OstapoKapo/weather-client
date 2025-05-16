'use client';
import './weatherClient.scss';
import {weatherResponse} from '@/types';
import CurrentWeather from '../weather/currentWeather/currentWeather';
import HoursTemp from '../weather/hoursTemp/hoursTemp';
import WindMapContainer from '../weather/windMapContainer/windMapContainer';
import DaysTemp from '../weather/daysTemp/daysTemp';
import EqualBlock from '../weather/equalBlock/equalBlock';
import Pagination from '../ui/pagination/pagination';
import Header from '../layout/header/header';

import { getCityByCoords, getWeatherByCity } from '@/services/weatherApi';
import { useEffect, useState } from 'react';
import { get } from 'http';

interface WeatherClientProps {
    defaultWeather: weatherResponse;
}

const weatherClient: React.FC<WeatherClientProps> = ({defaultWeather}) => {
  const [query, setQuery] = useState<string>('');
  const [localCity, setLocalCity] = useState<weatherResponse | null>(null);
  const [weatherData, setWeatherData] = useState<weatherResponse>(defaultWeather);
  const [choosenCity, setChosenCity] = useState<string>('');
  const [homeKey, setHomeKey] = useState<boolean>(false);


  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const city = await getCityByCoords(latitude,longitude);
        const res = await getWeatherByCity(city);
        setLocalCity(res);
        setHomeKey(true);
        setWeatherData(res); // замінює погоду
      });
    }
  }, []);


  useEffect(() => {
    const fetchWeather = async () => {
      if (choosenCity) {
        const res = await getWeatherByCity(choosenCity);
        setHomeKey(false)
        setWeatherData(res); // замінює погоду
      }
      if(choosenCity.length < 1) {
        if(localCity){
            setHomeKey(true);
            setWeatherData(localCity);
        }else{
            setHomeKey(false);
            setWeatherData(defaultWeather);
        }      
    }
    };
    fetchWeather();
  }, [choosenCity]);



  return (
    <div className='main' style={{ backgroundImage: `url('/background/night-cloud.png')` }}>
      <Header query={query} setQuery={setQuery} setChosenCity={setChosenCity}/>
      <div className="container">
        <CurrentWeather homeKey={homeKey} currentDay={weatherData.currentDay}/>
        <div className="main__content" >
          <HoursTemp  currentDesription={weatherData.currentDay.weather[0].description} hourlyForecast={weatherData.hourlyForecast}/>
          <WindMapContainer currentDay = {weatherData.currentDay}/>
          <DaysTemp currentDay = {weatherData.currentDay} forecast5Days={weatherData.forecast5Days}/>
          <EqualBlock currentDay={weatherData.currentDay} type='sunrise'/>
          <EqualBlock  currentDay={weatherData.currentDay} type='feelsLike'/>
          <EqualBlock  currentDay={weatherData.currentDay} hourlyForecast={weatherData.hourlyForecast} type='precipitation'/>
          <EqualBlock  currentDay={weatherData.currentDay}  type='pressure'/>
          <EqualBlock  currentDay={weatherData.currentDay} type='humidity'/>
          <EqualBlock currentDay={weatherData.currentDay} forecast5Days={weatherData.forecast5Days}  type='averages'/>
        </div>
      </div>
      <Pagination/>
    </div>
  );
}

export default weatherClient;
