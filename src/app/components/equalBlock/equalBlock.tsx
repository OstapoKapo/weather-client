import './equalBlock.scss';
import Image from 'next/image';

interface IEqualBlock {
    type: 'sunrise' | 'wind' | 'sunset' | 'pressure' | 'humidity' | 'visibility';
}

const EqualBlock:React.FC<IEqualBlock> = ({type}) => {
    switch (type) {
        case 'sunrise':
            return(
                <div className='block block--sunrise'>
                    <div className="blockHeader">
                        <Image src={'/wind.svg'} alt='sunriseImg' width={20} height={20}></Image>
                        <p>{type}</p>
                    </div>
                </div>
            )
        case 'wind':
            return(
                <div className='block block--wind'>
                    <div className="blockHeader">
                        <Image src={'/wind.svg'} alt='sunriseImg' width={20} height={20}></Image>
                        <p>{type}</p>
                    </div>
                </div>
            )  
        case 'sunset':
            return(
                <div className='block block--sunset'>
                    <div className="blockHeader">
                        <Image src={'/wind.svg'} alt='sunriseImg' width={20} height={20}></Image>
                        <p>{type}</p>
                    </div>
                </div>
            )  
        case 'pressure':
            return(
                <div className='block block--pressure'>
                    <div className="blockHeader">
                        <Image src={'/wind.svg'} alt='sunriseImg' width={20} height={20}></Image>
                        <p>{type}</p>
                    </div>
                </div>
            )
        case 'humidity':
            return(
                <div className='block block--humidity'>
                    <div className="blockHeader">
                        <Image src={'/wind.svg'} alt='sunriseImg' width={20} height={20}></Image>
                        <p>{type}</p>
                    </div>
                </div>
            )  
        case 'visibility':
            return(
                <div className='block block--visibility'>
                    <div className="blockHeader">
                        <Image src={'/wind.svg'} alt='sunriseImg' width={20} height={20}></Image>
                        <p>{type}</p>
                    </div>
                </div>
            )         
    }
}

export default EqualBlock;