import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useGetAllDessertsQuery } from '../../generated/graphql';
import { Dessert, FormVal, SortBy, SortOrderTypes } from '../../models/models';
import AddDessert from '../AddDessert';
import DessertRow from '../DessertRow';
import _ from 'lodash';

const Desserts = () => {
    const { data, loading, error } = useGetAllDessertsQuery();
    const [dessertsState, setDessertsState]: [Array<Dessert>, any] = useState([]);
    const [selectedIndexes, setSelectedIndexes]: [Array<number>, any] = useState([]);
    const [showDessertAdd, setShowDessertAdd] = useState(false);
    const desserts: Array<any> = data?.desserts || [];
    const [errorMsg, setErrorMsg] = useState('');
    const [sortByKey, setSortByKey]: [SortBy, any] = useState({key: '', order: 'ASC'});
    const [selectAll, setSelectAll] = useState(false);
    useEffect(() => {
        setDessertsState(desserts);
    }, [data]);
    if (loading) {
        return <div>Loading</div>;
    }
    if (error) {
        return <div>{error.message}</div>;
    }
    
    console.log('List of Desserts: ', dessertsState);
    
    const selectedIndex = (index: number, selected: boolean) => {
        console.log('In selected Index: ', index, selected);
        if (selected) {
            setSelectedIndexes(selectedIndexes.concat(
                index
            ));
        } else {
            setSelectedIndexes(selectedIndexes.filter(
                i => i !== index
            )); 
        }
    }

    const toggleAddDessert = (e: SyntheticEvent) => {
        e.preventDefault();
        setShowDessertAdd(!showDessertAdd);
    }

    const addDessert = (newVal: FormVal) => {
        setShowDessertAdd(false);
        setDessertsState((currentDesserts: Array<Dessert>) => {
            const newValArrayObject = Object.values(newVal);
            const dessertNameIndex = currentDesserts.findIndex(dessert => dessert.name.toLowerCase() === newValArrayObject[0].toLowerCase());
            if (dessertNameIndex >= 0) {
                setErrorMsg('Duplicate Dessert name is not allowed');
                return [...currentDesserts];
            } else {
                setErrorMsg('');
            }
            const dessertObject: Dessert = {
                id: currentDesserts.length + 1,
                name: newValArrayObject[0],
                calories: newValArrayObject[1],
                fat: newValArrayObject[2],
                carbs: newValArrayObject[3],
                protien: newValArrayObject[4]
            };
            return [...currentDesserts, dessertObject];
        });
    }

    const deleteSelectedDesserts = (e: SyntheticEvent) => {
        e.preventDefault();
        if (selectedIndexes.length) {
            setDessertsState((currentDesserts: Array<Dessert>) => {
                console.log('In set Desserts state: ', currentDesserts, selectedIndexes);
                const newDessertsList = [...currentDesserts];
                selectedIndexes.map(index => {
                    const findDessertIndex = newDessertsList.findIndex(dessert => dessert.id === index);
                    if (findDessertIndex >= 0) {
                        newDessertsList.splice(findDessertIndex, 1);
                    }
                });    
                setSelectedIndexes([]);
                return newDessertsList;
            });
        }
    }

    const sortBy = (key: string, order: SortOrderTypes = 'ASC') => {
        console.log('In sort by: ', sortByKey, key, order);
        if (sortByKey.key === key) {
            if (sortByKey.order === 'ASC') {
                order = 'DESC';
            } else {
                order = 'ASC';
            }
        }
        setSortByKey({
            key,
            order
        });
        setDessertsState((currentDesserts: Array<Dessert>) => {
            console.log('In set Desserts state: ', currentDesserts, selectedIndexes);
            let newDessertsList = [...currentDesserts];
            newDessertsList = newDessertsList.sort((a, b) => {
                let leftSide = _.get(a, key), // a[col.objectProperty],
                rightSide = _.get(b, key); // b[col.objectProperty];

                if (leftSide.constructor === String) {
                    // Lower case it for better comparison
                    leftSide = leftSide.toLowerCase();
                }
                if (rightSide.constructor === String) {
                    // Again, lower case it
                    rightSide = rightSide.toLowerCase();
                }
                if (order === 'ASC') {
                    return  leftSide < rightSide ? -1 :
                        leftSide > rightSide ?  1 : 0;
                } else {
                    return  leftSide > rightSide ? -1 :
                    leftSide < rightSide ?  1 : 0;
                }

            });
            return newDessertsList;
        });
    }

    const renderSortByArrows = (key: string) => {
        if (sortByKey.key === key) {
            if (sortByKey.order === 'ASC') {
                return <span>&#9650;</span>;
            } else {
                return <span>&#9660;</span>
            }
        }
        return false;
    }

    const closeAddDessertDialog = () => {
        setShowDessertAdd(false);
    }

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedIndexes(dessertsState.map(dessert => dessert.id));
        } else {
            setSelectedIndexes([]);
        }
    }

    if (desserts?.length) {
        let deleteButtonClassNames = 'bw1 pointer mr2 o-50 br2 bg-gray black pa1 tc ttu tracked';
        if (selectedIndexes.length) {
            deleteButtonClassNames = 'bw1 pointer mr2 glow br2 bg-blue white pa1 tc ttu tracked';
        }
        return (
            <div className='ma2'>
                <div className="flex items-center bg-light-pink h3 w-50">
                    <span className="hot-pink b flex-auto ml2">{selectedIndexes.length} Selected</span>
                    <div className='fr mb2'>
                        <button
                            type='button'
                            className='bw1 pointer br2 dim bg-blue white pa1 mr2 tc ttu tracked'
                            onClick={toggleAddDessert}>Add Dessert</button>

                        <button
                            type='button'
                            className={deleteButtonClassNames}
                            onClick={deleteSelectedDesserts}>Delete</button>
                    </div>
                </div>
                {errorMsg ? <span className='red cb ba pa1 br2 db'>{errorMsg}</span> : false}
                <div className='cb mb2'></div>
                <table className='collapse ba br2 b--black-10 pv2 ph3 w-50'>
                    <thead>
                        <tr className='striped--light-gray'>
                            <th className="tl pv2 ph3">
                                <input
                                    type='checkbox'
                                    checked={selectAll}
                                    onChange={handleSelectAll} /></th>
                            <th className='pointer pv2 ph3 tl f6 fw6 ttu' onClick={e => sortBy('name')}>
                                Dessert (100g serving) {renderSortByArrows('name')}</th>
                            <th className='pointer tl f6 ttu fw6 pv2 ph3' onClick={e => sortBy('calories')}>
                                Calories {renderSortByArrows('calories')}</th>
                            <th className='pointer tl f6 ttu fw6 pv2 ph3' onClick={e => sortBy('fat')}>
                                Fat (g) {renderSortByArrows('fat')}</th>
                            <th className='pointer tl f6 ttu fw6 pv2 ph3' onClick={e => sortBy('carbs')}>
                                Carbs (g) {renderSortByArrows('carbs')}</th>
                            <th className='pointer tl f6 ttu fw6 pv2 ph3' onClick={e => sortBy('protien')}>
                                Protien (g) {renderSortByArrows('protien')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dessertsState.map((dessertRow, index) => {
                            return (
                                <DessertRow key={index} rowData={dessertRow} selectedIndexCallback={selectedIndex} selectedIndexes={selectedIndexes} />
                            )
                        })}
                    </tbody>
                </table>
                {showDessertAdd ? <AddDessert addDessertCallback={addDessert} closeAddDessert={closeAddDessertDialog} /> : false}
            </div>
        );
    }
    return <div></div>;

}

export default Desserts;