import { ApolloServer, gql } from 'apollo-server-express';
import { getSpace, getSpaces, createSpace, updateSpace, createUser, updateUser } from './db/helper';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    spaces: [Space]
    spaceByName(name: String): Space
  }

  type Space {
    id: ID
    name: String
    created_at: Date
    updated_at: Date
  }

  type User {
    id: ID
    spaceId: ID
    username: String
    email: String
    created_at: Date
    updated_at: Date
  }

  type Mutation {
    createSpace(name: String): ID
    updateSpace(id: ID, name: String): ID
    createUser(username: String, email: String, spaceId: ID): ID
    updateUser(id: ID, username: String, email: String): ID
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
    spaces: () => getSpaces(),
    spaceByName: async (_parent, args) => {
      const res = await getSpace({ name: args.name });
      return res[0];
    },
  },
  Mutation: {
    createSpace: async (_parent, args) => {
      const res = await createSpace({ name: args.name });
      return res.id;
    },
    updateSpace: async (_parent, args) => {
      const res = await updateSpace({ id: args.id, name: args.name });
      return res;
    },
    createUser: async (_parent, args) => {
      const res = await createUser({ username: args.username, email: args.email, space_id: args.spaceId });
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
