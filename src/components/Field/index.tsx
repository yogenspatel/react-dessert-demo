import React, { useState } from 'react';
import { FormDessertField } from '../../models/models';

const Field = ({ index, field, fieldChanged, type, value = ''}: any) => {
    const checkValidation = (value: string, type: string) => {
        if (type === 'string') {
            return value.trim() !== '';
        } else {
            const re = /^[0-9\b]+$/;
            if (re.test(value)) {
                return true;
             }
         
        }
        return false; 
    }
    const [errorMsg, setErrorMsg] = useState('');
    return (
        <div key={index}>
            <label htmlFor={index} className='f6 b db mb2'>{field.label} {field.required ? <span className='red'>*</span> : false}</label>
            <input
                type={type || field.component}
                id={index}
                name={field.name}
                value={value}
                className='input-reset ba b--black-20 pa2 mb2 dib w-50'
                onChange={e => {
                    const isFieldValid = checkValidation(e.target.value, field.fieldType);
                    if (!isFieldValid) {
                        if (field.fieldType === 'string') {
                            setErrorMsg(`You must enter ${field.label}`);
                        } else {
                            setErrorMsg(`You must enter ${field.label} in number format`);
                        }
                    } else {
                        setErrorMsg('');
                    }
                    return fieldChanged(index, e.target.value, isFieldValid);
                }}
            />
            {errorMsg ? <span className='ba ml2 bw1 br2 pa1 fw1 red'>{errorMsg}</span> : false}
        </div>
    );
};

export default Field;
