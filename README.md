## To set up the project in local env
### Go to project's root directory
## To run graphql server
1. Go to the `graphql` directory - `cd graphql`
2. `npm install`
3. Go back to projects root directory - `cd ..` 
4. `npm run graphqlserver`

## To run app
1. `npm install`
2. `npm run start`
 

Runs the app in the development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- Open [http://localhost:4000/graphql](http://localhost:4000/graphql) to run graphql playground in the local browser.

# Note: You must run graphQL server in order to work app.

## Uses Following Tech Stack
1. React / React Hooks
2. TypeScript
3. Tachyons CSS
4. Apollo Client
5. React Testing Library
6. GraphQL (Apollo server)
## Implemented Following features
1. UI Table with selection 
2. Added Dessert Feature using Mutation Query
3. Deleted Dessert Feature using Mutation Query
4. Sort By Desserts, Calories, Fat, Carbs, Protein
5. Reset the mutated data in graphql server
6. Responsive UI
7. Form fields validation
8. Uses Context to pass Dessert List to the deep nested child component
