import React, { useContext, useState } from 'react';
import { DessertsContext } from '../../contexts/DessertList';
import { FormDessertField } from '../../models/models';

const Field = ({ index = '', field, fieldChanged, value = ''}: {index: string, field: FormDessertField, fieldChanged: Function, value: string}) => {
    const desserts = useContext(DessertsContext);
    const checkValidation = (value: string, field: FormDessertField): boolean => {
        if (field.fieldType === 'string') {
            const dessertNameIndex = desserts.findIndex(dessert => dessert.name.toLowerCase() === value.toLowerCase());
            if (dessertNameIndex >= 0) {
                setErrorMsg('Duplicate Dessert name is not allowed');
                return false;
            } else if (value.trim() === '') {
                setErrorMsg(`You must enter ${field.label}`);
                return false;
            }
        } else {
            const re = /^[0-9\b]+$/;
            if (!re.test(value)) {
                setErrorMsg(`You must enter ${field.label} in number format`);
                return false;
            }
         
        }
        setErrorMsg('');
        return true; 
    }
    const [errorMsg, setErrorMsg] = useState('');
    return (
        <div key={index}>
            <label htmlFor={index} className='f6 b db mb2'>{field.label} {field.required ? <span className='red'>*</span> : false}</label>
            {errorMsg ? <span className='ba db bw1 mb2 br2 pa1 fw1 red'>{errorMsg}</span> : false}
            <input
                type={field.type || field.component}
                id={index}
                name={field.label}
                value={value}
                className='input-reset ba b--black-20 pa2 mb2 dib w-100'
                onChange={e => {
                    const isFieldValid = checkValidation(e.target.value, field);
                    return fieldChanged(index, e.target.value, isFieldValid);
                }}
            />
        </div>
    );
};

export default Field;
