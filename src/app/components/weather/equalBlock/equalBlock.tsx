import { currentDay, forecast5Days, hourlyForecast } from '@/types';
import './equalBlock.scss';
import Image from 'next/image';

interface IEqualBlock {
    type: 'sunrise' | 'precipitation' | 'feelsLike' | 'pressure' | 'humidity' | 'averages';
    currentDay: currentDay;
    hourlyForecast?: hourlyForecast[]
    forecast5Days?: forecast5Days[]
}

const EqualBlock:React.FC<IEqualBlock> = ({type, currentDay,hourlyForecast, forecast5Days }) => {

    const createFeelsLikeReasonShort = (tempC:number, feelsLikeC:number, windSpeedMps:number, humidity:number ): string => {
        const delta = feelsLikeC - tempC;
      
        // Feels colder
        if (delta < -0.9) {
          if (windSpeedMps >= 2) return 'Wind makes it feel colder.';
          if (humidity <= 40) return 'Dry air makes it feel colder.';
          return 'The weather feels colder.';
        }
      
        // Feels warmer
        if (delta > 0.9) {
          if (humidity >= 80 && windSpeedMps < 2) return 'High humidity makes it feel warmer.';
        
          return 'The weather feels warmer.';
        }
      
        // Feels as it is
        return 'Temperature feels as it is.';
    }

    const getHoursAndMinutes = (date:number): string => {
        const newDate = new Date(date * 1000);
            
        const hours = newDate.getHours().toString().padStart(2, '0');
        const minutes = newDate.getMinutes().toString().padStart(2, '0');
        
        return `${hours}:${minutes}`;
    }

    const getMaxPrecipitation = (hourlyForecast:hourlyForecast[]): number => {
        let maxPrecipitation = 0;
        hourlyForecast.map((item)=>{
            if((item.rain?.['3h']) ?? 0 > maxPrecipitation) {
                maxPrecipitation = item.rain?.['3h'] ?? 0;
            }
        })

        return maxPrecipitation;
    }

    const  calculateDewPoint = (tempC: number, humidity: number): number => {
        const a = 17.27;
        const b = 237.7;
        const alpha = (a * tempC) / (b + tempC) + Math.log(humidity / 100);
        const dewPoint = (b * alpha) / (a - alpha);
        return parseFloat(dewPoint.toFixed(0));
    }

    const calculateAverageTemp = (forecast5Days:forecast5Days[]): {average: number, diference: number | string} => {
        let average = parseFloat((forecast5Days.reduce((acc, val) => acc + val.maxTemp, 0) / forecast5Days.length).toFixed(0));
        const diference = parseFloat((currentDay.todayHighLow.max - average).toFixed(0));
        return  {
            average: average,
            diference: (diference > 0 ? +diference : diference)
        };
    }

    const setPressurePosition = (pressure: number): number => {
        const minPressure = 870;
        const maxPressure = 1095;
      
        const clampedPressure = Math.min(Math.max(pressure, minPressure), maxPressure);
      
        const positionPercent = ((clampedPressure - minPressure) / (maxPressure - minPressure)) * 100;
        return positionPercent;
    }


    switch (type) {
        case 'sunrise':
            return(
                <div className='block block--sunrise'>
                    <div className="block__header">
                        <Image src={'/icon/sunrise.svg'} alt='sunriseImg' width={20} height={20}></Image>
                        <p>{type.toUpperCase()}</p>
                    </div>
                    <div className="block__content">
                        <h1>{getHoursAndMinutes((currentDay.sys.sunrise) ?? 0)}</h1>
                        <div className="block__space">
                            <p>Sunset: {getHoursAndMinutes((currentDay.sys.sunset) ?? 0)}</p>
                        </div>
                    </div>
                </div>
            )
        case 'feelsLike':
            return(
                <div className='block block--feelsLike'>
                    <div className="block__header">
                        <Image src={'/icon/thermometer.svg'} alt='feelsLikeImg' width={20} height={20}></Image>
                        <p style={{marginLeft: '5px'}}>{type.toUpperCase()}</p>
                    </div>
                    <div className="block__content">
                        <h1>{parseFloat((currentDay.main.feels_like).toFixed(0))}°</h1>
                        <div className="block__space">
                            <p>{createFeelsLikeReasonShort(currentDay.main.temp, currentDay.main.feels_like, currentDay.wind.speed, currentDay.main.humidity)}</p>
                        </div>
                    </div>
                </div>
            )  
        case 'precipitation':
            return(
                <div className='block block--precipitation'>
                    <div className="block__header">
                        <Image src={'/icon/precipitation.svg'} alt='precipitationImg' width={20} height={20}></Image>
                        <p>{type.toUpperCase()}</p>
                    </div>
                    <div className="block__content">
                        <h1>{getMaxPrecipitation(hourlyForecast ?? [])} mm</h1>
                        <div className="block__space">
                        </div>
                    </div>
                </div>
            )  
        case 'pressure':
            return(
                <div className='block block--pressure'>
                    <div className="block__header">
                    <Image src={'/icon/pressure.svg'} alt='sunriseImg' width={20} height={20}></Image>
                    <p>{type.toUpperCase()}</p>
                    </div>
                    <div className="block__content">
                        <div className='block--pressure__line'>
                            <div className="block--pressure__marker" style={{left: `${setPressurePosition(currentDay.main.pressure)}%`,}}></div>
                        </div>
                        <div className='block--pressure__descr'>
                            <p>low</p>
                            <p>high</p>
                       </div>
                       <div className="block__space">
                            <Image src={'icon/arrow-bottom.svg'} alt='arrow' width={20} height={20}></Image>
                            <span>{currentDay.main.pressure}</span>
                            <p>hPa</p>
                       </div>
                    </div>
                </div>
            )
        case 'humidity':
            return(
                <div className='block block--humidity'>
                    <div className="block__header">
                    <Image src={'/icon/humidity.svg'} alt='sunriseImg' width={20} height={20}></Image>
                    <p>{type.toUpperCase()}</p>
                    </div>
                    <div className="block__content">
                        <h1>{currentDay.main.humidity}%</h1>
                        <div className="block__space">
                            <p>The dew point is{' ' + calculateDewPoint(currentDay.main.temp, currentDay.main.humidity)}° right now</p>
                        </div>
                    </div>
                </div>
            )  
        case 'averages':
            return(
                <div className='block block--averages'>
                    <div className="block__header">
                    <Image src={'/icon/wind.svg'} alt='sunriseImg' width={20} height={20}></Image>
                    <p>{type.toUpperCase()}</p>
                    </div>
                    <div className="block__content">
                        <h1>{calculateAverageTemp(forecast5Days ?? []).diference}°</h1>
                        <p>From avarage <br />daily high</p>
                        <div className="block__space">
                            <div>
                                <span>Today</span>
                                <p>H: {parseFloat((currentDay.todayHighLow.max).toFixed(0))}°</p>
                            </div>
                            <div>
                                <span>Average</span>
                                <p>H: {calculateAverageTemp(forecast5Days ?? []).average}°</p>
                            </div>
                        </div>
                    </div>
                </div>
            )         
    }
}

export default EqualBlock;