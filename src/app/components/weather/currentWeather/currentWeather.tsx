import './currentWeather.scss';
import Image from 'next/image';
import {currentDay} from '@/types/index';

interface CurrentWeatherProps {
  currentDay: currentDay
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({currentDay}) => {
    return (
        <div className='currentWeather'>
          <div className="currentWeather__location">
            <Image src={'/icon/location-mark.png'} alt='locationImg' width={20} height={13} ></Image>
            <p>Capital</p>
          </div>
          <h1>{currentDay.name}</h1>
          <div className="currentWeather__temp">
            <p>{parseFloat((currentDay.main.temp).toFixed(0))}°</p>
            <span>{currentDay.weather[0].main}</span>
          </div>
          <div className="currentWeather__range">
            <p>H:{parseFloat((currentDay.todayHighLow.max).toFixed(0))}°  L:{parseFloat((currentDay.todayHighLow.min).toFixed(0))}°</p>
          </div>
        </div>
    );
}

export default CurrentWeather;