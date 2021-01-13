import { gql } from '@apollo/client';
export const ADD_DESSERT = gql `
    mutation AddDessert(
        $name: String!,
        $calories: Int!,
        $fat: Int!,
        $carbs: Int!,
        $protien: Int!) {
    add_dessert(
        objects: {
            name: $name,
            calories: $calories,
            fat: $fat,
            carbs: $carbs,
            protien: $protien
        }
    ){
        affected_rows
        returning {
          id
          title
          is_completed
        }
    }
  }
`;
