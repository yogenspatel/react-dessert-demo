import React, { SyntheticEvent } from 'react';

const Pagination = ({ currentPage, setCurrentPage, count, total }: {currentPage: number, setCurrentPage: Function, count: number, total: number}) => {
    const totalPages = Math.ceil(total/count);
    const paginationArray = Array.from({length: totalPages}, (_, index) => index + 1);
    const updateCurrentPage = (event: SyntheticEvent, pageNo: number) => {
        event.preventDefault();
        if (currentPage <= totalPages) {
            if (currentPage >= 1) {
                setCurrentPage(pageNo);
            } else {
                setCurrentPage(1);
            }
        }
    }
    return (
        <div className='tc mt2'>
            <span
                className={currentPage !== 1 ? 'pa3 pointer blue underline' : 'pa3 gray'}
                onClick={e => updateCurrentPage(e, 1)}>First</span>
            <span
                className={currentPage !== 1 ? 'pointer blue underline' : 'gray'}
                onClick={e => updateCurrentPage(e, currentPage - 1)}>Prev</span>
            <span className='center'>
                {
                    paginationArray.map(no => {
                        return (
                            currentPage === no ? <span className='pa2' key={no}>{no}</span>
                            : <span className='blue underline pointer pa2' onClick={e => updateCurrentPage(e, no)} key={no}>{no}</span>
                        );
                    })
                }
            </span>
            <span
                className={currentPage !== totalPages ? 'pa3 pointer blue underline' : 'pa3 gray'}
                onClick={e => updateCurrentPage(e, currentPage + 1)}>Next</span>
            <span
                className={currentPage !== totalPages ? 'pa3 pointer blue underline' : 'pa3 gray'}
                onClick={e => updateCurrentPage(e, totalPages)}>Last</span>
        </div>
    );
}

export default Pagination;
