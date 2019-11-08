import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import { MvrpAPI } from './dataSource';
//import 'dotenv/config';

const port = 8000

const app = express();
app.use(cors());

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
  type Station {
    id: Int!
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
    stations: (root, args, { dataSources }) => dataSources.mvrpAPI.getAllStations(),
  },
};

const serverA = new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources: () => ({
    mvrpAPI: new MvrpAPI()
  })
});

serverA.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: port }, () => {
  console.log(`Apollo Server on http://localhost:${port}/graphql`);
});

module.exports = app;