import './page.scss';
import Image from 'next/image';
import CurrentWeather from './components/currentWeather/currentWeather';
import HoursTemp from './components/hoursTemp/hoursTemp';
import WindMap from './components/windMap/windMap';
import DaysTemp from './components/daysTemp/daysTemp';
import EqualBlock from './components/equalBlock/equalBlock';

export default function Home() {
  return (
    <div className='main' style={{ backgroundImage: `url('/background/night-cloud.png')` }}>
      <div className="main__header">
        <div className="main__burger">
          <Image alt='burgerImg' src={'/icon/menu.svg'} width={30} height={30}></Image>
        </div>
        <div className="main__search-inp">
          <Image alt='searchImg' src={'/icon/search.svg'} width={20} height={20}></Image>
          <input type="text" placeholder='Search'/>
        </div>
      </div>
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
  );
}
