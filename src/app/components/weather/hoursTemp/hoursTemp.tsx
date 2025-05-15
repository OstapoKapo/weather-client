import { currentDay, hourlyForecast } from '@/types';
import './hoursTemp.scss';
import Image from 'next/image';

const hoursData = [1,2,3,4,5,6,7,8,9,10,11]

interface HoursTempPorps {
  currentDesription: string
  hourlyForecast:hourlyForecast[]
}

const HoursTemp:React.FC<HoursTempPorps> = ({currentDesription, hourlyForecast}) => {
    return (
         <div className='hours-temp'>
           <p className="hours-temp__header">
             {currentDesription}
           </p>
           <div className="hours-temp__line"></div>
           <div className="hours-temp__container">
           {hourlyForecast.map((item, index) => {
            const date = new Date(item.dt * 1000); // Перетворюємо в мілісекунди
            
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            
            const time = `${hours}:${minutes}`;

            return(
              <div key={index} className="hours-temp__item">
                <p>{time}</p>
                <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt='weatherType' width={30} height={30}/>
                <p>{parseFloat((item.main.temp_max).toFixed(0))}°</p>
              </div>
            )
       })}
           </div>
          </div>
    )
}

export default HoursTemp;