import './pagination.scss';

const Pagination = () => {
    return (
        <div className='pagination'>
            <div className="pagination__item pagination__item--active"></div>
            <div className="pagination__item"></div>
        </div>
    );
}

export default Pagination;