import './windMap.scss';
import Image from 'next/image';

const WindMap:React.FC = () => {
    return(
        <div className='wind-map'>
          <div className='wind-map__header'>
            <Image alt='windImg' src={'/icon/wind.svg'} width={20} height={20}></Image>
            <p className='wind-map__name'>Wind Map</p>
          </div>
          <div className="wind-map__item"></div>
        </div>
    )
}

export default WindMap;