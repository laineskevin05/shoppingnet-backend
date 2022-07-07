const { GraphQLSchema, GraphQLObjectType } = require("graphql");

// Queries
const {
  users,
  user,
  bloquesHtml,
  bloqueHtml,
  plantillasHtml,
  plantillaHtml,
  userPages,
  userPage,
} = require("./queries");

// Mutations
const { register, login } = require("./mutations");

// Define QueryType
const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "Queries",
  fields: {
    users,
    user,
    bloquesHtml,
    bloqueHtml,
    plantillasHtml,
    plantillaHtml,
    userPages,
    userPage,
  },
});

// Define MutationType
const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Mutations",
  fields: {
    register,
    login,
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
