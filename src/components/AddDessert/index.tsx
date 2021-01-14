import React, { SyntheticEvent, useState } from 'react'
import { FormFieldData } from '../../data/dessertFormData';
import { FormDessertField, FormVal } from '../../models/models';
import Field from '../Field';

const AddDessert = ({ addDessertCallback, closeAddDessert }: {addDessertCallback: Function, closeAddDessert: any}) => {
    const [values, setValues]: [FormVal, Function] = useState({});
    const [validForm, setValidForm] = useState(false);
    

    const [, setCurrentFormData] = useState(FormFieldData);
    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        if (validForm) {
            addDessertCallback(values);
        }
    };

    const fieldChanged = (fieldId: number, value: string, valid = false) => {
        setValues((currentValues: FormVal) => {
            currentValues[fieldId] = value;
            return currentValues;
        });

        setCurrentFormData(currentFormData => {
            currentFormData[fieldId].valid = valid;
            const notValidFields = currentFormData.filter(field => !field.valid);
            setValidForm(notValidFields.length ? false : true);
            return [...currentFormData];
        });
    };
    let submitButtonClassNames = 'bw1 br2 pa1 w-100 white ';
    submitButtonClassNames += validForm ? 'pointer bg-green' : 'bg-gray';
    return (
        <form className='absolute bg-white ba w-50' style={
            {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'}} onSubmit={onSubmit}>
            
            <span
                className='ba pointer tc dim br4 db w1 h1 absolute top-0 right-0 mr1 mt1'
                onClick={closeAddDessert}>
                    &#10006;</span>
            <div className='mw5 mw7-ns center pa3 ph5-ns'>
                <p className='bg-orange ba white pa1'>Please fill all details before you submit</p>
                {FormFieldData.map((field, i) => {
                    return (
                        <Field
                            key={i}
                            index={`${i}`}
                            field={field}
                            fieldChanged={fieldChanged}
                            value={values[i]}
                        />
                    )
                })}
                <input className={submitButtonClassNames} type='submit' value='Submit' />
            </div>
        </form>
    )
}

export default AddDessert;
