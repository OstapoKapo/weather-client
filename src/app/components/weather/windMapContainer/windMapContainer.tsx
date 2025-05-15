import dynamic from 'next/dynamic';
import './windMapContainer.scss';
import Image from 'next/image';
import { currentDay } from '@/types';

const WindMap = dynamic(() => import('../windMap/windMap'), { ssr: false,loading: () => <p>Loading map...</p>, });

interface WindMapContainerProps {
  currentDay: currentDay
}

const windMapContainer:React.FC<WindMapContainerProps> = ({currentDay}) => {
    return(
        <div className='wind-map'>
          <div className='wind-map__header'>
            <Image alt='windImg' src={'/icon/wind.svg'} width={20} height={20}></Image>
            <p className='wind-map__name'>Wind Map</p>
          </div>
          <div className="wind-map__item">
            <WindMap currentDay={currentDay}/>
          </div>
        </div>
    )
}

export default windMapContainer;