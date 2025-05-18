import React, { useMemo } from 'react';
import './daysTemp.scss';
import Image from 'next/image';
import { currentDay, forecast5Days } from '@/types';
interface DaysTempProps {
    forecast5Days:forecast5Days[],
    currentDay: currentDay
}

const DaysTemp: React.FC<DaysTempProps> = ({forecast5Days, currentDay}) => {
    const minTemp =  8; 
    const maxTemp = 20; 

    // Функція для обчислення кольору
    const getColor = (temp: number): string => {
        const clamped = Math.max(-10, Math.min(30, temp)); // Обрізаємо температуру в межах від -10 до 30
        const ratio = (clamped + 10) / 45; 

        const cold = { r: 102, g: 204, b: 255 }; // Холодний колір
        const hot = { r: 255, g: 180, b: 102 }; // Теплий колір

        const r = Math.round(cold.r + (hot.r - cold.r) * ratio);
        const g = Math.round(cold.g + (hot.g - cold.g) * ratio);
        const b = Math.round(cold.b + (hot.b - cold.b) * ratio);

        return `rgb(${r}, ${g}, ${b})`;
    };

    const getRangeStyle = (minTemp: number, maxTemp: number) => {

        const minVisual = 0;
        const maxVisual = 30;
        const visualRange = maxVisual - minVisual;

        const clampedMin = Math.max(minVisual, Math.min(maxVisual, minTemp));
        const clampedMax = Math.max(minVisual, Math.min(maxVisual, maxTemp));

        const maxDiff = 30;
        const minVisualWidth = 20;
        const maxVisualWidth = 100;

        const diff = Math.abs(clampedMax - clampedMin);
        const clampedDiff = Math.min(diff, maxDiff);

        const width = minVisualWidth + (clampedDiff / maxDiff) * (maxVisualWidth - minVisualWidth);

        // позиція залежить від minTemp, але не виходить за межі (0 до 100 - width)
        const leftRatio = (clampedMin - minVisual) / visualRange;
        const left = Math.max(0, Math.min(100 - width, leftRatio * 100));

        return {
            left: `${left}%`,
            width: `${width}%`,
            background: `linear-gradient(to right, ${getColor(minTemp)}, ${getColor(maxTemp)})`
        };
    };

    const setTempPosition = (maxTemp: number,minTemp: number, currentTemp: number): number => {
        if (maxTemp === minTemp) return 50;

        const clampedTemp = Math.max(minTemp, Math.min(maxTemp, currentTemp));
        const ratio = (clampedTemp - minTemp) / (maxTemp - minTemp);
        const percent = ratio * 100;
        return percent;
    }

    return (
        <div className='days-temp'>
            <div className='days-temp__header'>
                <Image alt='calendarImg' src={'/icon/calendar.svg'} width={20} height={20}></Image>
                <p className='days-temp__name'>5-DAY FORECAST</p>
            </div>
            {forecast5Days.map((day: forecast5Days, index) => {
                const style = getRangeStyle(day.minTemp, day.maxTemp);

                return (
                  <div key={index} className="days-temp__item">
                    <div className="days-temp__day">
                        <h3>{(day.day).substring(0,3)}</h3>
                    </div>
                    <img alt='calendarImg' src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}/>
                    <p><span>{parseFloat((day.minTemp).toFixed(0))}°</span></p>
                    <div className="days-temp__graph">
                        <div className="days-temp__range" style={style}>
                            <div className="days-temp__mark" style={{display: index === 0 ? 'flex' : 'none' ,left: `${setTempPosition(currentDay.todayHighLow.max, currentDay.todayHighLow.min, currentDay.main.temp)}%`}}></div>
                        </div>
                    </div>
                    <p>{parseFloat((day.maxTemp).toFixed(0))}°</p>
                  </div>
                );  
            })}
        </div>
    );
};

export default DaysTemp;
