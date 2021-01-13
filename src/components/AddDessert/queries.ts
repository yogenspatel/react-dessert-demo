import { gql } from '@apollo/client';
export const ADD_DESSERT = gql `
mutation addDessert ($dessert: DessertInput) {
        addDessert(dessert: $dessert){
        id
        name
        calories
        fat
        carbs
        protien
    }
}
`;
