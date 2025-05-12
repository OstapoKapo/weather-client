import './currentWeather.scss';
import Image from 'next/image';

const CurrentWeather = () => {
    return (
        <div className='currentWeather'>
          <div className="currentWeather__location">
            <Image src={'/icon/location-mark.png'} alt='locationImg' width={20} height={13} ></Image>
            <p>Home</p>
          </div>
          <h1>Yavoriv</h1>
          <div className="currentWeather__temp">
            <p>13°</p>
            <span>Sunny</span>
          </div>
          <div className="currentWeather__range">
            <p>H:14°  L:2°</p>
          </div>
        </div>
    );
}

export default CurrentWeather;