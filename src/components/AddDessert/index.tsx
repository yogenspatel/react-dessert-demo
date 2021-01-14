import React, { SyntheticEvent, useEffect, useState } from 'react'
import { FormFieldData } from '../../data/dessertFormData';
import { FormVal } from '../../models/models';
import Field from '../Field';

const AddDessert = ({ addDessertCallback }: {addDessertCallback: Function}) => {
    const [values, setValues]: [FormVal, Function] = useState({});
    const [validForm, setValidForm] = useState(false);
    let formFieldData = FormFieldData;

    const [, setCurrentFormData] = useState(FormFieldData);
    useEffect(() => {
        formFieldData = FormFieldData.map(fieldData => {
            fieldData.valid = false;
            return fieldData;
        });
        setCurrentFormData(formFieldData);
    }, [addDessertCallback]);
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
        <form onSubmit={onSubmit}>
            
            <div className='mw5 mw7-ns center pa3 ph5-ns'>
                <p className='bg-orange ba white pa1'>Please fill all details before you submit</p>
                {formFieldData.map((field, i) => {
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
