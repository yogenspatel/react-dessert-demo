import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useAddDessertMutation, useGetAllDessertsQuery, useRemoveDessertMutation, useResetDessertDataMutation } from '../../generated/graphql';
import { Dessert, FormVal, SortBy, SortOrderTypes } from '../../models/models';
import AddDessert from '../AddDessert';
import DessertRow from '../DessertRow';
import _ from 'lodash';
import { DessertsContext } from '../../contexts/DessertList';
import Model from '../Modal';
import ModelDialog from '../ModalDialog';
import Pagination from '../Pagination';
import PageSize from '../PageSize';
import FilterDesserts from '../FilterDesserts';

const Desserts = () => {
    const [pageSize, setPageSize]: [number, Function] = useState(10);
    const [currentPage, setCurrentPage]: [number, Function] = useState(1);
    let { loading, error, fetchMore: fetchMoreDessertsData } = useGetAllDessertsQuery({
        variables: {
            pagination: {
                page: currentPage,
                count: pageSize
            }
        }
    });
    // Hook for the GraphQL Mutation to add dessert
    const [addDessertMutation] = useAddDessertMutation();
    // Hook for the GraphQL Mutation to remove desserts
    const [deleteDessertMutation] = useRemoveDessertMutation();
    // Hook for the GraphQL Mutation to reset desserts data
    const [resetDessetsDataMutation] = useResetDessertDataMutation()
    // Hook to maintain state or set state for the list of dessert
    const [dessertsState, setDessertsState]: [Array<Dessert>, Function] = useState([]);
    const [totalDesserts, setTotalDesserts]: [number, Function] = useState(0);
    // Hook to maintain state or set state for the selected desserts
    const [selectedIndexes, setSelectedIndexes]: [Array<number>, Function] = useState([]);
    // Hook to maintain state or set state for the sort (key, order)
    const [sortByKey, setSortByKey]: [SortBy, Function] = useState({key: '', order: 'ASC'});
    // Hook to maintain state or set state for the select all desserts data
    const [selectAll, setSelectAll] = useState(false);
    // Hook to maintain state or set state to show/hide modal
    const [showDessertAddModal, setShowDessertAddModal] = useState(false);
    // Hook to maintain state or set state to show/hide delete confirm modal
    const [showDessertDeleteConfirmModal, setShowDessertDeleteConfirmModal] = useState(false);
    // Hook to maintain state or set state to show/hide reset confirm modal
    const [showDessertResetConfirmModal, setShowDessertResetConfirmModal] = useState(false);

    useEffect(() => {
        const getDessertsData = async () => {
            console.log('In page size updated:');
            const dessertsData = await fetchMoreDessertsData({
                variables: {
                    pagination: {
                        page: currentPage,
                        count: pageSize
                    }
                }
            });
            setDessertsState(dessertsData.data.desserts);
            setTotalDesserts(dessertsData.data.total || 0);
        }
        getDessertsData();
    }, [pageSize, currentPage]);
    
    if (loading) {
        return <div>Loading</div>;
    }
    if (error) {
        return <div>{error.message}</div>;
    }
    
    // console.log('List of Desserts: ', dessertsState);
    
    const selectedIndex = (index: number, selected: boolean) => {
        // console.log('In selected Index: ', index, selected);
        if (selected) {
            // setDessertsState((currentDesserts: Array<Dessert>) => {
            setSelectedIndexes((currentSelectedIndexes: Array<number>) => {
                const newSelectedIndexes = currentSelectedIndexes.concat(index);
                if (newSelectedIndexes.length === dessertsState.length) {
                    setSelectAll(true);
                }
                return newSelectedIndexes;
            });
        } else {
            setSelectedIndexes((currentSelectedIndexes: Array<number>) => {
                const newSelectedIndexes = selectedIndexes.filter(i => i !== index);
                if (newSelectedIndexes.length !== dessertsState.length) {
                    setSelectAll(false);
                }
                return newSelectedIndexes;
            }); 
        }
    }

    const toggleAddDessert = (e: SyntheticEvent) => {
        e.preventDefault();
        //  setShowDessertAdd(!showDessertAdd);
        setShowDessertAddModal(!showDessertAddModal);
    }

    const addDessert = async (newVal: FormVal) => {
        setShowDessertAddModal(false);
        // setShowDessertAdd(false);
        const newValArrayObject = Object.values(newVal);
        const dessertObject: Dessert = {
            id: totalDesserts + 1,
            name: newValArrayObject[0],
            calories: +newValArrayObject[1],
            fat: +newValArrayObject[2],
            carbs: +newValArrayObject[3],
            protien: +newValArrayObject[4]
        };
        const addDessertData = await addDessertMutation({
            variables: {
                dessert: dessertObject
            }
        });
        setDessertsState(addDessertData.data?.addDessert);
    }

    const deleteSelectedDesserts = async (e: SyntheticEvent) => {
        e.preventDefault();
        setShowDessertDeleteConfirmModal(false);
        // if (selectedIndexes.length) {
        const deleteDessertData = await deleteDessertMutation({
            variables: {
                dessertIds: selectedIndexes
            }
        });
        setDessertsState(deleteDessertData.data?.removeDessert);
        setSelectedIndexes([]);
        // }
    }

    const sortBy = (key: string, order: SortOrderTypes = 'ASC') => {
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
            // console.log('In set Desserts state: ', currentDesserts, selectedIndexes);
            let newDessertsList = [...currentDesserts];
            newDessertsList = newDessertsList.sort((a, b) => {
                let leftSide = _.get(a, key),
                rightSide = _.get(b, key);

                if (leftSide.constructor === String) {
                    // Lower case it for better comparison
                    leftSide = leftSide.toLowerCase();
                }
                if (rightSide.constructor === String) {
                    // Lower case it for better comparison
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

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedIndexes(dessertsState.map(dessert => dessert.id));
        } else {
            setSelectedIndexes([]);
        }
    }

    const resetData = async (e: SyntheticEvent) => {
        e.preventDefault();
        setShowDessertResetConfirmModal(false);
        // if (dessertsState.length) {
            const desserts = await resetDessetsDataMutation();
            setDessertsState(desserts.data?.resetDesserts);
            setSelectedIndexes([]);
        // }
    }

    const closeDessertAddModel = () => {
        setShowDessertAddModal(false);
    }

    const closeDessertDeleteConfirmModel = () => {
        setShowDessertDeleteConfirmModal(false);
    }

    const closeDessertResetConfirmModel = () => {
        setShowDessertResetConfirmModal(false);
    }

    const showDessertDeleteConfirmModelDialog = (e: SyntheticEvent) => {
        e.preventDefault();
        if (selectedIndexes.length) {
            setShowDessertDeleteConfirmModal(true);
        }
    }

    const showDessertResetConfirmModelDialog = (e: SyntheticEvent) => {
        e.preventDefault();
        if (dessertsState.length) {
            setShowDessertResetConfirmModal(true);
        }
    }

    let deleteButtonClassNames = 'bw1 mr2 o-50 br2 bg-gray black pa1 tc ttu tracked';
    if (selectedIndexes.length) {
        deleteButtonClassNames = 'bw1 pointer mr2 glow br2 bg-blue white pa1 tc ttu tracked';
    }

    let resetDataButtonClassNames = 'bw1 fr mt3 br2 bg-gray o-50 white pa1 mr2 tc ttu tracked';
    if (dessertsState.length) {
        resetDataButtonClassNames = 'bw1 fr mt3 pointer br2 bg-green dim white pa1 mr2 tc ttu tracked';
    }
    return (
        <DessertsContext.Provider value={dessertsState}>
            <div className='ma2 w-50 center'>
                <div>
                    <h2 className='gray dib'>Nutrition List</h2>
                    <button
                        type='button'
                        className={resetDataButtonClassNames}
                        onClick={showDessertResetConfirmModelDialog}>Reset Data</button>
                </div>
                <PageSize
                    pageSize={pageSize}
                    setPageSize={setPageSize} />
                {/* <FilterDesserts /> */}
                <div className='flex items-center bg-light-pink h3'>
                    <span className='hot-pink b flex-auto ml2'>{selectedIndexes.length} Selected</span>
                    <div className='fr mb2'>
                        <button
                            type='button'
                            className='bw1 pointer br2 dim bg-blue white pa1 mr2 tc ttu tracked'
                            onClick={toggleAddDessert}>Add Dessert</button>

                        <button
                            type='button'
                            className={deleteButtonClassNames}
                            onClick={showDessertDeleteConfirmModelDialog}>Delete</button>
                    </div>
                </div>
                <div className='cb mb2'></div>
                {dessertsState.length ? <div><table className='collapse ba br2 b--black-10 pv2 ph3 w-100'>
                    <thead>
                        <tr className='striped--light-gray'>
                            <th className='tl pv2 ph3'>
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
                <Pagination
                    count={pageSize}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    total={totalDesserts} /> </div> : <div className='bg-washed-yellow ba br1 orange pa1'><span>There are no Nutrition Data available. Click <span className='b blue underline-hover pointer' onClick={toggleAddDessert}>Add Dessert</span> to add data.</span></div>}
                <Model
                    show={showDessertAddModal}
                    closeModel={closeDessertAddModel}
                    title='Add Dessert Nutrition'>
                    <AddDessert addDessertCallback={addDessert} />
                </Model>

                <ModelDialog
                    show={showDessertDeleteConfirmModal}
                    title='Delete Dessert(s)'
                    content='Are you sure want to delete selected item(s)?'
                    confirmCallBack={deleteSelectedDesserts}
                    closeModelDialogCallback={closeDessertDeleteConfirmModel} />

                <ModelDialog
                    show={showDessertResetConfirmModal}
                    title='Reset Nutrition List'
                    content='Are you sure want to reset nutrition data?'
                    confirmCallBack={resetData}
                    closeModelDialogCallback={closeDessertResetConfirmModel} />
            </div>
        </DessertsContext.Provider>
    );
}

export default Desserts;
