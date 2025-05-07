import React, { useMemo } from 'react';
import './daysTemp.scss';
import Image from 'next/image';

const DaysTemp: React.FC = () => {
    const minTemp =  8; 
    const maxTemp =20; 

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

        const minVisual = -10;
        const maxVisual = 30;
        const visualRange = maxVisual - minVisual;

        const clampedMin = Math.max(minVisual, Math.min(maxVisual, minTemp));
        const clampedMax = Math.max(minVisual, Math.min(maxVisual, maxTemp));

        const maxDiff = 20;
        const minVisualWidth = 10;
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

    // Використовуємо useMemo для оптимізації стилів
    const style = useMemo(() => getRangeStyle(minTemp, maxTemp), [minTemp, maxTemp]);

    return (
        <div className='days-temp'>
            <div className='days-temp__header'>
                <Image alt='calendarImg' src={'/icon/calendar.svg'} width={20} height={20}></Image>
                <p className='days-temp__name'>10-DAY FORECAST</p>
            </div>
            <div className="days-temp__item">
                <div className="days-temp__day">
                    <h3>Today</h3>
                </div>
                <Image alt='calendarImg' src={'/icon/cloudy-weather.svg'} width={30} height={30}></Image>
                <p><span>13°</span></p>
                <div className="days-temp__graph">
                    <div className="days-temp__range" style={style}></div>
                </div>
                <p>18°</p>
            </div>
            <div className="days-temp__item">
                <h3>Tomorrow</h3>
                <Image alt='calendarImg' src={'/icon/cloudy-weather.svg'} width={30} height={30}></Image>
                <p><span>10°</span></p>
                <div className="days-temp__graph">
                    <div className="days-temp__range" style={style}></div>
                </div>
                <p>15°</p>
            </div>
        </div>
    );
};

export default DaysTemp;
