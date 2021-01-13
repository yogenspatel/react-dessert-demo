import { gql } from '@apollo/client';
export const GET_ALL_DESSERTS = gql `
  query GetAllDesserts {
    desserts{
      id
      name
      calories
      fat
      carbs
      protien
    }
  }
`;


export const REMOVE_DESSERTS_BY_IDS = gql `
  mutation removeDessert($dessertIds: [Int]) {
    removeDessert(dessertIds: $dessertIds){
        id
        name
        calories
        fat
        carbs
        protien
      }
  }
`;