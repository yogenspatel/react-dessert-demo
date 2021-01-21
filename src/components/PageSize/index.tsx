import React from 'react';

const PageSize = ({ pageSize, setPageSize }: {pageSize: number, setPageSize: Function}) => {
    const pageSizes: Array<number> = [10, 20, 30, 40, 50];
    const onPageSizeChange = (e: any) => {
        setPageSize(+e.target.value);
    }
    return (
        <div>
            <span>Page Size: </span>
            <select
                value={pageSize}
                onChange={onPageSizeChange}>
                {pageSizes.map(size => <option key={size}>{size}</option>)}
            </select>
        </div>
    );
}

export default PageSize;
