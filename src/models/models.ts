export interface Dessert {
    id: number;
    name: string;
    calories: number;
    fat: number;
    carbs: number;
    protien: number;
}


export interface FormDessertField {
    component: string;
    label: string;
    type: string;
    required: boolean;
    fieldType: string;
    valid: boolean;
}


export interface FormVal {
    [key: number]: string;
}

export type SortOrderTypes = 'ASC' | 'DESC';

export interface SortBy {
    key: string;
    order: SortOrderTypes;
}
