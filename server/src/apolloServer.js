import { ApolloServer, gql } from 'apollo-server-express';
import { getStation, getStations, createStation, updateStation, createUser, updateUser, getUser } from './db/helper';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

require('dotenv').config({ path: '../.env' });

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    getStations: [Station]
    getStationByName(name: String!): Station
    getUser(id: ID, email: String, username: String): User
  }

  type Station {
    id: ID!
    name: String!
    created_at: Date!
    updated_at: Date
  }

  type User {
    id: ID!
    stationId: ID!
    username: String!
    email: String!
    created_at: Date!
    updated_at: Date
  }

  type Mutation {
    createStation(name: String!): ID!
    updateStation(id: ID!, name: String!): ID!
    createUser(username: String!, email: String!, stationId: ID!): ID!
    updateUser(id: ID!, username: String!, email: String!): ID!
  }

  scalar Date
`;

const dateType = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.getTime();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10);
    }
    return null;
  },
});

const resolvers = {
  Query: {
    getStations: () => getStations(),
    getStationByName: async (_parent, args) => {
      const res = await getStation({ name: args.name });
      return res[0];
    },
    getUser: async (_parent, args) => {
      const res = await getUser({
        id: args.id,
        email: args.email,
        username: args.username,
      });
      return res[0];
    },
  },
  Mutation: {
    createStation: async (_parent, args) => {
      const res = await createStation({ name: args.name });
      return res.id;
    },
    updateStation: async (_parent, args) => {
      const res = await updateStation({ id: args.id, name: args.name });
      return res;
    },
    createUser: async (_parent, args) => {
      const res = await createUser({ username: args.username, email: args.email, stationId: args.stationId });
      return res.id;
    },
    updateUser: async (_parent, args) => {
      const res = await updateUser({ id: args.id, username: args.username, email: args.email });
      return res;
    },
  },
  Date: dateType,
};

export const createServer = (app) => {
  const server = new ApolloServer({ typeDefs, resolvers });

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));

  return server;
};
