import './hoursTemp.scss';
import Image from 'next/image';

const hoursData = [1,2,3,4,5,6,7,8,9,10,11]

interface WeatherBlockProps {
  type: string;
}

const HoursTemp:React.FC = () => {
    return (
         <div className='hours-temp'>
           <p className="hours-temp__header">
             Sunny conditions will continue through the day with a high of 25°C.
           </p>
           <div className="hours-temp__line"></div>
           <div className="hours-temp__container">
           {hoursData.map((item, index) => (
             <div key={index} className="hours-temp__item">
             <p>Now</p>
             <div className="hours-temp__item-img">
               <Image src={'/icon/cloudy-weather.svg'} alt='weatherType' width={30} height={30}></Image>
             </div>
             <p>13°</p>
           </div>
           ))}
           </div>
          </div>
    )
}

export default HoursTemp;