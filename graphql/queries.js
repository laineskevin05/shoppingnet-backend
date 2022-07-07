const { GraphQLList, GraphQLID, GraphQLNonNull } = require("graphql");
const {
  UserType,
  BloqueHtmlType,
  PlantillaHtmlType,
  UserPagesType,
} = require("./types");
const { User, BloquesHTML, PlantillasHTML, UserPages } = require("../models");

const users = {
  type: new GraphQLList(UserType),
  description: "Retrieves a list of users",
  // el primer argumento de de graphql
  // el segundo argumento son los parametros que se le pasan a la funcion
  // el tercero es toda la peticion que se le pasa
  resolve: (_, l, req) => {
    // solo si el usuario esta autenticado
    // enviara la informacion de la base de datos
    console.log(req.verifiedUser);
    return req.verifiedUser ? User.find() : null;
  },
};

const user = {
  type: UserType,
  description: "retrieves a single user",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_, { id }, { verifiedUser }) => {
    // solo si el usuario esta autenticado
    // enviara la informacion de la base de datos
    return verifiedUser ? User.findById(id) : null;
  },
};

const bloquesHtml = {
  type: new GraphQLList(BloqueHtmlType),
  description: "Retrieves a list of bloques html",

  resolve: (_, l, { verifiedUser }) => {
    // solo si el usuario esta autenticado
    // enviara la informacion de la base de datos
    return verifiedUser ? BloquesHTML.find() : null;
  },
};

const bloqueHtml = {
  type: BloqueHtmlType,
  description: "retrieves a single bloque html",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_, { id }, { verifiedUser }) => {
    // solo si el usuario esta autenticado
    // enviara la informacion de la base de datos
    return verifiedUser ? BloquesHTML.findById(id) : null;
  },
};

const plantillasHtml = {
  type: new GraphQLList(PlantillaHtmlType),
  description: "Retrieves a list of plantillas html",

  resolve: (_, l, { verifiedUser }) => {
    return verifiedUser ? PlantillasHTML.find() : null;
  },
};

const plantillaHtml = {
  type: PlantillaHtmlType,
  description: "retrieves a single plantilla html",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_, { id }, { verifiedUser }) => {
    return verifiedUser ? PlantillasHTML.findById(id) : null;
  },
};

const userPages = {
  type: new GraphQLList(PlantillaHtmlType),
  description: "Retrieves a list of user pages",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_, { id }, { verifiedUser }) => {
    return verifiedUser ? UserPages.findById(id) : null;
  },
};

const userPage = {
  type: PlantillaHtmlType,
  description: "retrieves a single user page",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_, { id }, { verifiedUser }) => {
    return verifiedUser ? UserPages.findById(id) : null;
  },
};

module.exports = {
  users,
  user,
  bloquesHtml,
  bloqueHtml,
  plantillasHtml,
  plantillaHtml,
  userPages,
  userPage,
};
