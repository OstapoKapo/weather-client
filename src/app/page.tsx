import './page.scss';
import Image from 'next/image';
import CurrentWeather from './components/currentWeather/currentWeather';

export default function Home() {
  return (
    <div className='main' style={{ backgroundImage: `url('/background/day-rain.png')` }}>
      <div className="main__header">
        <div className="main__header-burger">
          <Image alt='burgerImg' src={'/icon/menu.svg'} width={30} height={30}></Image>
        </div>
        <div className="main__header-inp">
          <Image alt='searchImg' src={'/icon/search.svg'} width={20} height={20}></Image>
          <input type="text" placeholder='Search'/>
        </div>
      </div>
      <div className="main__content">
        <CurrentWeather/>
      </div>
    </div>
  );
}
