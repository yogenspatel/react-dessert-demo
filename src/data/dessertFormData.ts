import { FormDessertField } from './../models/models';
export const FormFieldData: Array<FormDessertField> = [
    {
        'component': 'text',
        'label': 'Dessert Name',
        'type': 'text',
        'required': true,
        'fieldType': 'string',
        'valid': false
    },
    {
        'component': 'text',
        'label': 'Calories (100g serving)',
        'type': 'text',
        'required': true,
        'fieldType': 'number',
        'valid': false
    },
    {
        'component': 'text',
        'label': 'Fat (g)',
        'type': 'text',
        'required': true,
        'fieldType': 'number',
        'valid': false
    },
    {
        'component': 'text',
        'label': 'Carbs (g)',
        'type': 'text',
        'required': true,
        'fieldType': 'number',
        'valid': false
    },
    {
        'component': 'text',
        'label': 'Protein (g)',
        'type': 'text',
        'required': true,
        'fieldType': 'number',
        'valid': false
    }
];
