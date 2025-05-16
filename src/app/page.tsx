import './page.scss';
import WeatherClient from './components/weatherClient/weatherClient';
import { getWeatherByCity } from '@/services/weatherApi';



const Home = async () => {
  const defaultWeather = await getWeatherByCity('Kyiv');

  return <WeatherClient defaultWeather={defaultWeather} />;

}

export default Home;
