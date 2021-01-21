import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Paginate = {
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

export type Dessert = {
  __typename?: 'dessert';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  calories?: Maybe<Scalars['Int']>;
  fat?: Maybe<Scalars['Int']>;
  carbs?: Maybe<Scalars['Int']>;
  protien?: Maybe<Scalars['Int']>;
};

export type DessertInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  calories?: Maybe<Scalars['Int']>;
  fat?: Maybe<Scalars['Int']>;
  carbs?: Maybe<Scalars['Int']>;
  protien?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  desserts?: Maybe<Array<Maybe<Dessert>>>;
  total?: Maybe<Scalars['Int']>;
};


export type QueryDessertsArgs = {
  paginate?: Maybe<Paginate>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addDessert?: Maybe<Array<Maybe<Dessert>>>;
  removeDessert?: Maybe<Array<Maybe<Dessert>>>;
  resetDesserts?: Maybe<Array<Maybe<Dessert>>>;
};


export type MutationAddDessertArgs = {
  dessert?: Maybe<DessertInput>;
};


export type MutationRemoveDessertArgs = {
  dessertIds?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type AddDessertMutationVariables = Exact<{
  dessert?: Maybe<DessertInput>;
}>;


export type AddDessertMutation = (
  { __typename?: 'Mutation' }
  & { addDessert?: Maybe<Array<Maybe<(
    { __typename?: 'dessert' }
    & Pick<Dessert, 'id' | 'name' | 'calories' | 'fat' | 'carbs' | 'protien'>
  )>>> }
);

export type GetAllDessertsQueryVariables = Exact<{
  pagination?: Maybe<Paginate>;
}>;


export type GetAllDessertsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'total'>
  & { desserts?: Maybe<Array<Maybe<(
    { __typename?: 'dessert' }
    & Pick<Dessert, 'id' | 'name' | 'calories' | 'fat' | 'carbs' | 'protien'>
  )>>> }
);

export type RemoveDessertMutationVariables = Exact<{
  dessertIds?: Maybe<Array<Maybe<Scalars['Int']>> | Maybe<Scalars['Int']>>;
}>;


export type RemoveDessertMutation = (
  { __typename?: 'Mutation' }
  & { removeDessert?: Maybe<Array<Maybe<(
    { __typename?: 'dessert' }
    & Pick<Dessert, 'id' | 'name' | 'calories' | 'fat' | 'carbs' | 'protien'>
  )>>> }
);

export type ResetDessertDataMutationVariables = Exact<{ [key: string]: never; }>;


export type ResetDessertDataMutation = (
  { __typename?: 'Mutation' }
  & { resetDesserts?: Maybe<Array<Maybe<(
    { __typename?: 'dessert' }
    & Pick<Dessert, 'id' | 'name' | 'calories' | 'fat' | 'carbs' | 'protien'>
  )>>> }
);


export const AddDessertDocument = gql`
    mutation addDessert($dessert: DessertInput) {
  addDessert(dessert: $dessert) {
    id
    name
    calories
    fat
    carbs
    protien
  }
}
    `;
export type AddDessertMutationFn = Apollo.MutationFunction<AddDessertMutation, AddDessertMutationVariables>;

/**
 * __useAddDessertMutation__
 *
 * To run a mutation, you first call `useAddDessertMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDessertMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDessertMutation, { data, loading, error }] = useAddDessertMutation({
 *   variables: {
 *      dessert: // value for 'dessert'
 *   },
 * });
 */
export function useAddDessertMutation(baseOptions?: Apollo.MutationHookOptions<AddDessertMutation, AddDessertMutationVariables>) {
        return Apollo.useMutation<AddDessertMutation, AddDessertMutationVariables>(AddDessertDocument, baseOptions);
      }
export type AddDessertMutationHookResult = ReturnType<typeof useAddDessertMutation>;
export type AddDessertMutationResult = Apollo.MutationResult<AddDessertMutation>;
export type AddDessertMutationOptions = Apollo.BaseMutationOptions<AddDessertMutation, AddDessertMutationVariables>;
export const GetAllDessertsDocument = gql`
    query GetAllDesserts($pagination: Paginate) {
  desserts(paginate: $pagination) {
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

/**
 * __useGetAllDessertsQuery__
 *
 * To run a query within a React component, call `useGetAllDessertsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDessertsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDessertsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetAllDessertsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllDessertsQuery, GetAllDessertsQueryVariables>) {
        return Apollo.useQuery<GetAllDessertsQuery, GetAllDessertsQueryVariables>(GetAllDessertsDocument, baseOptions);
      }
export function useGetAllDessertsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllDessertsQuery, GetAllDessertsQueryVariables>) {
          return Apollo.useLazyQuery<GetAllDessertsQuery, GetAllDessertsQueryVariables>(GetAllDessertsDocument, baseOptions);
        }
export type GetAllDessertsQueryHookResult = ReturnType<typeof useGetAllDessertsQuery>;
export type GetAllDessertsLazyQueryHookResult = ReturnType<typeof useGetAllDessertsLazyQuery>;
export type GetAllDessertsQueryResult = Apollo.QueryResult<GetAllDessertsQuery, GetAllDessertsQueryVariables>;
export const RemoveDessertDocument = gql`
    mutation removeDessert($dessertIds: [Int]) {
  removeDessert(dessertIds: $dessertIds) {
    id
    name
    calories
    fat
    carbs
    protien
  }
}
    `;
export type RemoveDessertMutationFn = Apollo.MutationFunction<RemoveDessertMutation, RemoveDessertMutationVariables>;

/**
 * __useRemoveDessertMutation__
 *
 * To run a mutation, you first call `useRemoveDessertMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveDessertMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeDessertMutation, { data, loading, error }] = useRemoveDessertMutation({
 *   variables: {
 *      dessertIds: // value for 'dessertIds'
 *   },
 * });
 */
export function useRemoveDessertMutation(baseOptions?: Apollo.MutationHookOptions<RemoveDessertMutation, RemoveDessertMutationVariables>) {
        return Apollo.useMutation<RemoveDessertMutation, RemoveDessertMutationVariables>(RemoveDessertDocument, baseOptions);
      }
export type RemoveDessertMutationHookResult = ReturnType<typeof useRemoveDessertMutation>;
export type RemoveDessertMutationResult = Apollo.MutationResult<RemoveDessertMutation>;
export type RemoveDessertMutationOptions = Apollo.BaseMutationOptions<RemoveDessertMutation, RemoveDessertMutationVariables>;
export const ResetDessertDataDocument = gql`
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
export type ResetDessertDataMutationFn = Apollo.MutationFunction<ResetDessertDataMutation, ResetDessertDataMutationVariables>;

/**
 * __useResetDessertDataMutation__
 *
 * To run a mutation, you first call `useResetDessertDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetDessertDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetDessertDataMutation, { data, loading, error }] = useResetDessertDataMutation({
 *   variables: {
 *   },
 * });
 */
export function useResetDessertDataMutation(baseOptions?: Apollo.MutationHookOptions<ResetDessertDataMutation, ResetDessertDataMutationVariables>) {
        return Apollo.useMutation<ResetDessertDataMutation, ResetDessertDataMutationVariables>(ResetDessertDataDocument, baseOptions);
      }
export type ResetDessertDataMutationHookResult = ReturnType<typeof useResetDessertDataMutation>;
export type ResetDessertDataMutationResult = Apollo.MutationResult<ResetDessertDataMutation>;
export type ResetDessertDataMutationOptions = Apollo.BaseMutationOptions<ResetDessertDataMutation, ResetDessertDataMutationVariables>;