import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Dessert } from '../../models/models';

const DessertRow = ({ rowData, selectedIndexes = [], selectedIndexCallback }: {rowData: Dessert, selectedIndexes: Array<number>, selectedIndexCallback: Function}) => {
    const [rowSelected, setRowSelected] = useState(false);
    const handleCheckChange = (e: SyntheticEvent) => {
        setRowSelected(!rowSelected);
        selectedIndexCallback(rowData.id, !rowSelected);
    }
    useEffect(() => {
        const foundIndex = selectedIndexes.findIndex(index => index === rowData.id);
        if (foundIndex >= 0) {
            setRowSelected(true);
        } else {
            setRowSelected(false);
        }
    }, [selectedIndexes]);
    return (
    <tr className='striped--light-gray'>
        <td className='pv2 ph3'>
            <input
                type='checkbox'
                checked={rowSelected}
                onChange={handleCheckChange} />
        </td>
        <td className='pv2 ph3'>{rowData.name}</td>
        <td className='pv2 ph3'>{rowData.calories}</td>
        <td className='pv2 ph3'>{rowData.fat}</td>
        <td className='pv2 ph3'>{rowData.carbs}</td>
        <td className='pv2 ph3'>{rowData.protien}</td>
    </tr>
    );

}

export default DessertRow;
