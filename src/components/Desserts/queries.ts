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
