'use client';
import { useEffect, useMemo, useState } from 'react';
import './header.scss';
import Image from 'next/image';
import debounce from 'lodash.debounce';
import { fetchCities } from '@/services/weatherApi';
import { addSity, deleteCity } from '@/services/user';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { weatherResponse } from '@/types';



interface HeaderProps {
  query: string;
  weatherData: weatherResponse;
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

const Header: React.FC<HeaderProps> = ({query, setQuery, setChosenCity, weatherData}) => {
   
  const dispatch = useAppDispatch();  
  const user = useAppSelector((state)=> state.user);

  const [choosenCityKey, setChosenCityKey] = useState<boolean>(false);

  const [suggestions, setSuggestions] = useState<City[]>([]);

  const getFetchCities = async (input: string) => {
    const data:City[] = await fetchCities(input);
    setSuggestions(data);
  };

  const debouncedFetchCities = useMemo(
    () => debounce(getFetchCities, 500), // затримка 500мс
    []
  );

  useEffect(() => {
    if (query.trim()) {
      debouncedFetchCities(query.toLowerCase());
    }
    if(query.length === 0 ){
      setSuggestions([]);
      setChosenCityKey(false);
      setChosenCity('')
    }
  }, [query]);

  const handleChooseCity = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLElement;
    const cityName = target.getAttribute('data-action') ?? '';
    setChosenCity(cityName);
    setQuery(cityName);
    setSuggestions([]);
    setChosenCityKey(true);
  }

  const handleCancelCity = () => {
    setChosenCity('');
    setQuery('');
    setSuggestions([]);
    console.log('cancel');
    setChosenCityKey(false);
  }

  const handleAddCity = async () => {
    await addSity(dispatch, weatherData.currentDay.name);
    handleCancelCity();
  }

  const handleDeleteCity = async () => {
    await deleteCity(dispatch, weatherData.currentDay.name);
    handleCancelCity();
  }


  return (
        <div className="header">
          {user.bookmarks.includes(weatherData.currentDay.name) ? (
            <div  className="header__add-btn" onClick={handleDeleteCity}>
              <Image alt='addImg' src={'/icon/delete.svg'} width={20} height={20}></Image>
              <p>Delete</p>
            </div>
          ) : (
            <div className="header__add-btn" onClick={handleAddCity}>
             <Image alt='addImg' src={'/icon/add.svg'} width={20} height={20}></Image>
             <p>Add</p>
            </div>
          )}
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
            <div className='header__list' style={{display: !choosenCityKey &&  suggestions.length >= 1 ? 'flex' : 'none'}}>
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