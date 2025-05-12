import './page.scss';
import Image from 'next/image';
import CurrentWeather from './components/currentWeather/currentWeather';
import HoursTemp from './components/hoursTemp/hoursTemp';
import WindMap from './components/windMap/windMap';
import DaysTemp from './components/daysTemp/daysTemp';
import EqualBlock from './components/equalBlock/equalBlock';
import Header from './components/header/header';
import Pagination from './components/pagination/pagination';

export default function Home() {
  return (
    <div className='main' style={{ backgroundImage: `url('/background/night-cloud.png')` }}>
      <div className="container">
        <Header/>
        <CurrentWeather/>
        <div className="main__content">
          <HoursTemp/>
          <WindMap />
          <DaysTemp/>
          <EqualBlock type='sunrise'/>
          <EqualBlock type='wind'/>
          <EqualBlock type='sunset'/>
          <EqualBlock type='pressure'/>
          <EqualBlock type='humidity'/>
          <EqualBlock type='visibility'/>
        </div>
      </div>
      <Pagination/>
    </div>
  );
}
