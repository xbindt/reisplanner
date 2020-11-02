import { ApolloServer, gql } from 'apollo-server-express';
import { nsAPI } from './dataSource';

const app = require("../../lib/server");

const schema = gql`
  type Query {
    stations: [Station!]
    departures(code: String!): [DepartureTime]
    trip(fromStation:String, toStation:String): [Trips]
  }
  type Namen {
    lang: String
    kort: String
    middel: String
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

  enum Status {
    CANCELLED
    CHANGE_NOT_POSSIBLE
    CHANGE_COULD_BE_POSSIBLE
    ALTERNATIVE_TRANSPORT
    DISRUPTION
    MAINTENANCE
    UNCERTAIN
    REPLACEMENT
    ADDITIONAL
    SPECIAL
    NORMAL
  }

  type TripStation {
    name: String
    plannedDateTime: String
    actualDateTime: String
    actualTrack: String
    plannedTrack: String
  }

  type Leg {
    origin: TripStation
    destination: TripStation
  }

  type Trips {
    uid: String
    plannedDurationInMinutes: Int
    status: Status
    transfers: Int
    legs: [Leg]
  }

  type Trip {
    fromStation: String
    toStation: String
  }
`;

const resolvers = {
  Query: {
    stations: (root, args, { dataSources }) => dataSources.nsAPI.getAllStations(),
    departures: (root, args, { dataSources }) => dataSources.nsAPI.getDepartures(args.code),
    trip: (root, args, { dataSources }) => dataSources.nsAPI.getTrip(args.fromStation, args.toStation),
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
