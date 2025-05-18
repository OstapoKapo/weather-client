'use client'
import './pagination.scss';


interface PaginationProps {
    page: number;
    setPage: (page: number) => void;
    paginatedCities: string[];
    choosenCity: string;
}


const Pagination: React.FC<PaginationProps> = ({page, setPage, paginatedCities, choosenCity}) => {

    return (
        <div style={{display: !choosenCity.trim() ? 'flex': 'none'}} className='pagination'>
            {paginatedCities.map((item, index) => {
                return (
                    <div key={index} className={ page === index ? 'pagination__item pagination__item--active' : 'pagination__item' } onClick={() => setPage(index)}>
                       
                    </div>
                )
            })}
        </div>
    );
}

export default Pagination;