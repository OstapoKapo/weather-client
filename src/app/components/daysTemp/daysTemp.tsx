import React from 'react';
import './daysTemp.scss';
import Image from 'next/image';

const daysTemp:React.FC = () => {
    return (
        <div className='days-temp'>
            <div className='days-temp__header'>
                <Image alt='calendarImg' src={'/icon/calendar.svg'} width={30} height={30}></Image>
                <p>10-day forecast</p>
            </div>
            <div className="days-temp__item">
                <h3>Today</h3>
                <Image alt='calendarImg' src={'/icon/cloudy-weather.svg'} width={30} height={30}></Image>
                <p><span>13°</span></p>
                <div className="days-temp__graph"></div>
                <p>18°</p>
            </div>
        </div>
    )
}

export default daysTemp;