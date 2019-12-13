import { ApolloServer, gql } from 'apollo-server-express';
import { nsAPI } from './dataSource';

const app = require("../../lib/server");

const schema = gql`
  type Query {
    stations: [Station!]
    departures(code: String!): [DepartureTime]
  }
  type Namen {
    lang: String
    kort:  String
    middel:  String
  }
  type Station {
    code: String!
    namen: Namen
    synoniemen: [String]
  }
  type Message {
    message: String
    style: String
  }
  type DepartureTime {
    plannedDateTime: String
    actualDateTime: String
    messages: [Message]
    direction: String
    actualTrack: String
    plannedTrack: String
  }
  type Departures {
    code: Station
  }
`;

const resolvers = {
  Query: {
    stations: (root, args, { dataSources }) => dataSources.nsAPI.getAllStations(),
    departures: (root, args, { dataSources }) => dataSources.nsAPI.getDepartures(args.code),
  },
};

const serverA = new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources: () => ({
    nsAPI: new nsAPI()
  }),
  playground: process.env.NODE_ENV==='development',
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
});

serverA.applyMiddleware({ app, path: '/graphql', cors: false });

module.exports = app;
