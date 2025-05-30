'use client';
import './weatherClient.scss';
import {weatherResponse} from '@/types';
import CurrentWeather from '../weather/currentWeather/currentWeather';
import HoursTemp from '../weather/hoursTemp/hoursTemp';
import WindMapContainer from '../weather/windMapContainer/windMapContainer';
import DaysTemp from '../weather/daysTemp/daysTemp';
import EqualBlock from '../weather/equalBlock/equalBlock';
import LoadingScreen from '../ui/loadingScreen/loadingScreen';
import Pagination from '../ui/pagination/pagination';
import Header from '../layout/header/header';

import { motion } from 'framer-motion';
import { getCityByCoords, getWeatherByCity } from '@/services/weatherApi';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { initUser } from '@/services/auth';

interface WeatherClientProps {
    defaultWeather: weatherResponse;
}

const WeatherClient: React.FC<WeatherClientProps> = ({defaultWeather}) => {
   
  const dispatch = useAppDispatch();  
  const user = useAppSelector((state) => state.user);

  const [geoChecked, setGeoChecked] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [localCity, setLocalCity] = useState<weatherResponse | null>(null);
  const [weatherData, setWeatherData] = useState<weatherResponse  | any >(null);
  const [choosenCity, setChosenCity] = useState<string>('');
  const [homeKey, setHomeKey] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [paginatedCities, setPaginatedCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  
  setTimeout(() => setIsLoading(false), 400); // навіть затримку можеш зробити, щоб м’якше

  useEffect(() => {
    const fetchWeatherByGeolocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              const city = await getCityByCoords(latitude, longitude);
              const res = await getWeatherByCity(city);
              setLocalCity(res);
              setWeatherData(res);
              setHomeKey(true);
            } catch (err) {
              console.error('Failed to fetch by geolocation', err);
              setWeatherData(defaultWeather);
            } finally {
              setGeoChecked(true);
              setIsLoading(false);
            }
          },
          (error) => {
            console.error('Geolocation error:', error);
            setWeatherData(defaultWeather);
            setGeoChecked(true);
            setIsLoading(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      } else {
        setWeatherData(defaultWeather);
        setGeoChecked(true);
        setIsLoading(false);
      }
    };
  
    const timer = setTimeout(fetchWeatherByGeolocation, 100);
    return () => clearTimeout(timer);
  }, []);
  
  

  useEffect(() => {
    initUser(dispatch);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!geoChecked) return;
  
      if (choosenCity.trim()) {
        const res = await getWeatherByCity(choosenCity);
        setHomeKey(false);
        setWeatherData(res);
      } else {
        if (localCity) {
          setHomeKey(true);
          setWeatherData(localCity);
        } else {
          setHomeKey(false);
          setWeatherData(defaultWeather);
        }
      }
    };
  
    fetchWeather();
  }, [choosenCity, geoChecked, localCity]);

  useEffect(() => {
    if (localCity) {
      const cityName = localCity.currentDay.name;
      if (user.bookmarks.includes(cityName)) {
        const index =  user.bookmarks.indexOf(cityName)
        setPaginatedCities(user.bookmarks);
        setPage(index);
      } else {
        setPaginatedCities([cityName, ...user.bookmarks]);
      }
    } else {
        setPaginatedCities(['Kyiv', ...user.bookmarks]);
    }
  }, [user.bookmarks, localCity]);
  

  useEffect(() => {
    const handlePage = async () => {
        if (paginatedCities.length === 0) {
            console.warn('paginatedCities empty, skipping fetch');
            return;
          }
          
          const city = paginatedCities[page];
    
          if (!city || city === undefined) {
            console.warn('Empty city name, skipping fetch');
            return;
          }
    
          try {
            const res = await getWeatherByCity(city);
            setWeatherData(res);
            setHomeKey(city === localCity?.currentDay.name);
          } catch (error) {
            console.error('Error fetching weather by city:', error);
          }
        
      };
    handlePage();
  }, [page, paginatedCities, localCity]);

  if (isLoading) {
    return <LoadingScreen/>;
  }


  return (
    <>
    {weatherData !== null ? 
     (
        <motion.div
      key={'animation'}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}>
         <div className='main' style={{ backgroundImage: `url('/background/night-cloud.png')` }}>
        <Header  query={query} weatherData={weatherData} setQuery={setQuery} setChosenCity={setChosenCity}/>
        <div className="container">
          {geoChecked && <CurrentWeather homeKey={homeKey} currentDay={weatherData.currentDay}/>}
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
        <Pagination choosenCity={choosenCity} paginatedCities={paginatedCities} page={page} setPage={setPage}/>
      </div>
      </motion.div>) : <div className='main' style={{ backgroundImage: `url('/background/night-cloud.png')`, height: '100vh' }}></div> }
    </>
  );
}

export default WeatherClient;
