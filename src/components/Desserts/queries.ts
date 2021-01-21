import { gql } from '@apollo/client';
export const GET_ALL_DESSERTS = gql `
  query GetAllDesserts($pagination: Paginate) {
    desserts(paginate: $pagination){
      id
      name
      calories
      fat
      carbs
      protien
    }
    total
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


export const RESET_DESSERTS_DATA = gql `
  mutation resetDessertData {
    resetDesserts {
        id
        name
        calories
        fat
        carbs
        protien
      }
  }
`;