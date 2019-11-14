import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import { nsAPI } from './dataSource';

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
  })
});

serverA.applyMiddleware({ app, path: '/graphql', cors: false });

app.listen({ port: port }, () => {
  console.log(`Apollo Server on http://localhost:${port}/graphql`);
});

module.exports = app;