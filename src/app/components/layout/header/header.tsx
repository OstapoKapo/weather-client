'use client';
import { useEffect, useMemo, useState } from 'react';
import './header.scss';
import Image from 'next/image';
import debounce from 'lodash.debounce';
import { fetchCities } from '@/services/weatherApi';



interface HeaderProps {
  query: string;
  setQuery: (query: string) => void;
  setChosenCity: (city: string) => void;
}

interface City {
  name: string;
  local_names: {
    [key: string]: string;
  }
  lat: number;
  lon: number;
  country: string;
  state: string;
}

const Header: React.FC<HeaderProps> = ({query, setQuery, setChosenCity}) => {
   
  const [suggestions, setSuggestions] = useState<[]>([]);

  const getFetchCities = async (input: string) => {
    const data = await fetchCities(input);
    console.log(data)
    console.log(input)
    setSuggestions(data);
  };

  const debouncedFetchCities = useMemo(
    () => debounce(getFetchCities, 500), // затримка 500мс
    []
  );

  useEffect(() => {
    if (query.length > 1) {
      debouncedFetchCities(query.toLowerCase());
    }
  }, [query]);

  const handleChooseCity = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLElement;
    const cityName = target.getAttribute('data-action') ?? '';
    setChosenCity(cityName);
    setQuery(cityName);
    setSuggestions([]);
  }

  const handleCancelCity = () => {
    setChosenCity('');
    setQuery('');
    console.log('cancel')
  }

  return (
        <div className="header">
          <div className="header__add-btn">
            <Image alt='addImg' src={'/icon/add.svg'} width={20} height={20}></Image>
            <p>Add</p>
          </div>
          <div className='header__search'>
            <div className="header__inp">
              <Image alt='searchImg' src={'/icon/search.svg'} width={20} height={20}></Image>
              <input type="text" 
                placeholder='Search'  
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div style={{display: query.length > 1 ? 'flex' : 'none'}} onClick={handleCancelCity} >
                <Image alt='cancel' width={20} height={20} src={'/icon/cancel.svg'}></Image>
              </div>
            </div>
            <div className='header__list' style={{display: suggestions.length > 1 ? 'flex' : 'none'}}>
              <p>Search Results</p>
              <ul>
                {suggestions.map((city:City, index) => (
                  <li data-action={city.name} onClick={handleChooseCity} key={index}>{city.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
    )
}

export default Header;