import { ApolloServer, gql } from 'apollo-server-express';
import { nsAPI } from './dataSource';

const app = require("../../lib/server");

const schema = gql`
  type Query {
    users: [User!]
    me: User
    user(id: ID!): User
    stations: [Station!]
  }
  type User {
    id: ID!
    username: String!
  }
  type Names {
    lang: String
    kort:  String
    middel:  String
  }
  type Station {
    code: String!
    names: [Names]
    synoniemen: [String]
  }
`;

let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
};

const me = users[1];

const resolvers = {
  Query: {
    users: () => {
      return Object.values(users);
    },
    user: (parent, { id }) => {
      return users[id];
    },
    me: () => {
      return me;
    },
    stations: (root, args, { dataSources }) => dataSources.nsAPI.getAllStations(),
  },
};

const serverA = new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources: () => ({
    nsAPI: new nsAPI()
  }),
  playground: true,
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
});

serverA.applyMiddleware({ app, path: '/graphql', cors: false });

module.exports = app;