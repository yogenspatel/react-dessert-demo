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


export type Dessert = {
  __typename?: 'dessert';
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
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type GetAllDessertsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDessertsQuery = (
  { __typename?: 'Query' }
  & { desserts?: Maybe<Array<Maybe<(
    { __typename?: 'dessert' }
    & Pick<Dessert, 'id' | 'name' | 'calories' | 'fat' | 'carbs' | 'protien'>
  )>>> }
);


export const GetAllDessertsDocument = gql`
    query GetAllDesserts {
  desserts {
    id
    name
    calories
    fat
    carbs
    protien
  }
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