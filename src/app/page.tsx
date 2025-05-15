'use client';
import './page.scss';
import {weatherResponse} from '@/types';
import CurrentWeather from './components/weather/currentWeather/currentWeather';
import HoursTemp from './components/weather/hoursTemp/hoursTemp';
import WindMapContainer from './components/weather/windMapContainer/windMapContainer';
import DaysTemp from './components/weather/daysTemp/daysTemp';
import EqualBlock from './components/weather/equalBlock/equalBlock';
import Pagination from './components/ui/pagination/pagination';
// import { getWeatherByCity } from '@/services/weatherApi';
import { useEffect, useState } from 'react';
import Header from './components/layout/header/header';

const Home =  () => {
  
  // const [weather, setWeather] = useState<weatherResponse>(await getWeatherByCity('Kyiv'));
  const data:weatherResponse  = 
  { "currentDay": {
        "coord": {
            "lon": 30.5167,
            "lat": 50.4333
        },
        "weather": [
            {
                "id": 804,
                "main": "Clouds",
                "description": "overcast clouds",
                "icon": "04n"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 8.18,
            "feels_like": 8.18,
            "temp_min": 8.18,
            "temp_max": 8.18,
            "pressure": 1013,
            "humidity": 79,
            "sea_level": 1013,
            "grnd_level": 997
        },
        "visibility": 10000,
        "wind": {
            "speed": 0.45,
            "deg": 224,
            "gust": 0.89
        },
        "clouds": {
            "all": 100
        },
        "dt": 1747099802,
        "sys": {
            "type": 2,
            "id": 2003742,
            "country": "UA",
            "sunrise": 1747102398,
            "sunset": 1747157723
        },
        "timezone": 10800,
        "id": 703447,
        "name": "Kyiv",
        "cod": 200,
        "todayHighLow": {
            "max": 12.54,
            "min": 5.57
        }
    },
    "hourlyForecast": [
        {
            "dt": 1747105200,
            "main": {
                "temp": 8.18,
                "feels_like": 6.62,
                "temp_min": 5.67,
                "temp_max": 8.18,
                "pressure": 1013,
                "sea_level": 1013,
                "grnd_level": 997,
                "humidity": 79,
                "temp_kf": 2.51
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 2.57,
                "deg": 265,
                "gust": 6.28
            },
            "visibility": 10000,
            "pop": 1,
            "rain": {
                "3h": 1.44
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2025-05-13 03:00:00"
        },
        {
            "dt": 1747116000,
            "main": {
                "temp": 8.12,
                "feels_like": 5.99,
                "temp_min": 8.01,
                "temp_max": 8.12,
                "pressure": 1013,
                "sea_level": 1013,
                "grnd_level": 997,
                "humidity": 81,
                "temp_kf": 0.11
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 3.44,
                "deg": 302,
                "gust": 5.33
            },
            "visibility": 10000,
            "pop": 1,
            "rain": {
                "3h": 0.16
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2025-05-13 06:00:00"
        },
        {
            "dt": 1747126800,
            "main": {
                "temp": 9.45,
                "feels_like": 7.49,
                "temp_min": 9.45,
                "temp_max": 10.09,
                "pressure": 1013,
                "sea_level": 1013,
                "grnd_level": 997,
                "humidity": 74,
                "temp_kf": -0.64
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 3.67,
                "deg": 302,
                "gust": 5.09
            },
            "visibility": 10000,
            "pop": 1,
            "rain": {
                "3h": 0.79
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2025-05-13 09:00:00"
        },
        {
            "dt": 1747137600,
            "main": {
                "temp": 12.39,
                "feels_like": 11.28,
                "temp_min": 12.39,
                "temp_max": 12.39,
                "pressure": 1012,
                "sea_level": 1012,
                "grnd_level": 996,
                "humidity": 61,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": {
                "all": 97
            },
            "wind": {
                "speed": 3.5,
                "deg": 331,
                "gust": 5.31
            },
            "visibility": 10000,
            "pop": 1,
            "rain": {
                "3h": 1.11
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2025-05-13 12:00:00"
        },
        {
            "dt": 1747148400,
            "main": {
                "temp": 12.54,
                "feels_like": 11.36,
                "temp_min": 12.54,
                "temp_max": 12.54,
                "pressure": 1012,
                "sea_level": 1012,
                "grnd_level": 996,
                "humidity": 58,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": {
                "all": 93
            },
            "wind": {
                "speed": 2.85,
                "deg": 328,
                "gust": 4.32
            },
            "visibility": 10000,
            "pop": 1,
            "rain": {
                "3h": 0.75
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2025-05-13 15:00:00"
        },
        {
            "dt": 1747159200,
            "main": {
                "temp": 8.98,
                "feels_like": 8.13,
                "temp_min": 8.98,
                "temp_max": 8.98,
                "pressure": 1012,
                "sea_level": 1012,
                "grnd_level": 996,
                "humidity": 84,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                }
            ],
            "clouds": {
                "all": 94
            },
            "wind": {
                "speed": 1.86,
                "deg": 300,
                "gust": 3.61
            },
            "visibility": 10000,
            "pop": 1,
            "rain": {
                "3h": 0.99
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2025-05-13 18:00:00"
        },
        {
            "dt": 1747170000,
            "main": {
                "temp": 7.06,
                "feels_like": 5.38,
                "temp_min": 7.06,
                "temp_max": 7.06,
                "pressure": 1012,
                "sea_level": 1012,
                "grnd_level": 996,
                "humidity": 89,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Rain",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 87
            },
            "wind": {
                "speed": 2.45,
                "deg": 264,
                "gust": 5.45
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2025-05-13 21:00:00"
        },
        {
            "dt": 1747180800,
            "main": {
                "temp": 5.57,
                "feels_like": 3.19,
                "temp_min": 5.57,
                "temp_max": 5.57,
                "pressure": 1012,
                "sea_level": 1012,
                "grnd_level": 996,
                "humidity": 89,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                }
            ],
            "clouds": {
                "all": 72
            },
            "wind": {
                "speed": 3,
                "deg": 277,
                "gust": 8.8
            },
            "visibility": 10000,
            "pop": 0.2,
            "rain": {
                "3h": 0.1
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2025-05-14 00:00:00"
        }
    ],
    "forecast5Days": [
      {
          "maxTemp": 15.79,
          "minTemp": 4.61,
          "main": "Clouds",
          "icon": "04d",
          "day": "Tuesday"
      },
      {
          "maxTemp": 15.24,
          "minTemp": 7.09,
          "main": "Rain",
          "icon": "10d",
          "day": "Wednesday"
      },
      {
          "maxTemp": 10,
          "minTemp": 5.15,
          "main": "Clouds",
          "icon": "04d",
          "day": "Thursday"
      },
      {
          "maxTemp": 11.43,
          "minTemp": 6.4,
          "main": "Clouds",
          "icon": "04n",
          "day": "Friday"
      },
      {
          "maxTemp": 13.69,
          "minTemp": 6.26,
          "main": "Clouds",
          "icon": "04d",
          "day": "Saturday"
      }
  ]
}

  // useEffect (() => {
  //   const fetchWeatherData = async () => {
  //     const result = await getWeatherByCity('Kyiv');
  //     setData(result);
  //   };
  
  //   fetchWeatherData();
  // },[])

  return (
    <div className='main' style={{ backgroundImage: `url('/background/night-cloud.png')` }}>
      <Header />
      <div className="container">
        <CurrentWeather currentDay={data.currentDay}/>
        <div className="main__content" >
          <HoursTemp  currentDesription={data.currentDay.weather[0].description} hourlyForecast={data.hourlyForecast}/>
          <WindMapContainer currentDay = {data.currentDay}/>
          <DaysTemp currentDay = {data.currentDay} forecast5Days={data.forecast5Days}/>
          <EqualBlock currentDay={data.currentDay} type='sunrise'/>
          <EqualBlock  currentDay={data.currentDay} type='feelsLike'/>
          <EqualBlock  currentDay={data.currentDay} hourlyForecast={data.hourlyForecast} type='precipitation'/>
          <EqualBlock  currentDay={data.currentDay}  type='pressure'/>
          <EqualBlock  currentDay={data.currentDay} type='humidity'/>
          <EqualBlock currentDay={data.currentDay} forecast5Days={data.forecast5Days}  type='averages'/>
        </div>
      </div>
      <Pagination/>
    </div>
  );
}

export default Home;