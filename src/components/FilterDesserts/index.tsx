import React, { useState } from 'react';

const FilterDesserts = () => {
    const [searchText, setSearchText] = useState('');
    const onSearchText = (e: any) => {
        setSearchText(e.target.value);
    }
    return (
        <div>
            <span>Filter: </span>
            <input
                type='text'
                value={searchText}
                onChange={onSearchText}
            />
        </div>
    );
}

export default FilterDesserts;
