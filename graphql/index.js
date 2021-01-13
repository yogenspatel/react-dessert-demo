const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "dessert" type defines the queryable fields for every dessert in our data source.
  type dessert {
    id: Int
    name: String
    calories: Int
    fat: Int
    carbs: Int
    protien: Int
  }

  input DessertInput {
    id: Int
    name: String
    calories: Int
    fat: Int
    carbs: Int
    protien: Int
  }


  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "dessert" query returns an array of zero or more Desserts (defined above).
  type Query {
    desserts: [dessert]
  }

  type Mutation {
    addDessert(dessert: DessertInput): [dessert]
    removeDessert(dessertIds: [Int]): [dessert]
  }
`;

const desserts = [
    {
      id: 1,
      name: 'Oreo',
      calories: 427,
      fat: 18,
      carbs: 43,
      protien: 4
    },
    {
      id: 2,
      name: 'Nouget',
      calories: 108,
      fat: 19,
      carbs: 9,
      protien: 37
    },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves desserts from the "desserts" array above.
const resolvers = {
    Query: {
      desserts: () => desserts,
    },
    Mutation: {
      addDessert: (_, { dessert }) => {
        desserts.push(dessert);
        return desserts;
      },
      removeDessert: (_, args) => {
        const { dessertIds } = args;
        dessertIds.map(id => {
          const findDessertIndex = desserts.findIndex(dessert => dessert.id === id);
          if (findDessertIndex >= 0) {
            desserts.splice(findDessertIndex, 1);
          }
        });
        return desserts;
      }
    }
};

  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
