import './header.scss';
import Image from 'next/image';

const Header = () => {
    return (
        <div className="header">
        <div className="header__add-btn">
          <Image alt='addImg' src={'/icon/add.svg'} width={20} height={20}></Image>
          <p>Add</p>
        </div>
          <div className="header__search-inp">
            <Image alt='searchImg' src={'/icon/search.svg'} width={20} height={20}></Image>
            <input type="text" placeholder='Search'/>
          </div>
</div>
    )
}

export default Header;