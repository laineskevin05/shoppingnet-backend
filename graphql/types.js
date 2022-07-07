const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} = require("graphql");

const { User } = require("../models");

const UserType = new GraphQLObjectType({
  name: "User",
  description: "User type",
  fields: () => ({
    id: { type: GraphQLID },
    tipoUsuario: { type: GraphQLString },
    nombre: { type: GraphQLString },
    apellido: { type: GraphQLString },
    email: { type: GraphQLString },
    telefono: { type: GraphQLString },
    direccion: { type: GraphQLString },
    tipoNegocio: { type: GraphQLString },
    descripcion: { type: GraphQLString },
  }),
});

/**tipoUsuario: {
      type: String,
      required: true,
    },
    //nombre es obligatorio para los tres tipos de usuario
    //nombre tambien se refiere al nombre de la empresa
    nombre: {
      type: String,
      required: true,
    },
    Apellido: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Provide a valid email",
      ],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    telefono: {
      type: String,
      required: false,
    },
    direccion: {
      type: String,
      required: false,
    },
    //solo para el usuario empresa
    tipoNegocio: {
      type: String,
      required: false,
    },
    //solo para el usuario empresa
    descripcion: {
      type: String,
      required: false,
    }, */
const BloqueHtmlType = new GraphQLObjectType({
  name: "BloqueHtml",
  description: "BloquesHtml type",
  fields: () => ({
    id: { type: GraphQLID },
    autor: {
      type: UserType,
      resolve: (bloqueHtml) => User.findById(bloqueHtml.autorId),
    },
    titulo: { type: GraphQLString },
    html: { type: GraphQLString },
  }),
});

const PlantillaHtmlType = new GraphQLObjectType({
  name: "PlantillaHtml",
  description: "PlantillaHtml type",
  fields: () => ({
    id: { type: GraphQLID },
    autor: {
      type: UserType,
      resolve: (plantillaHtml) => User.findById(plantillaHtml.autorId),
    },
    descripcion: { type: GraphQLString },
    listaHTML: { type: new GraphQLList(GraphQLString) },
  }),
});

const UserPagesType = new GraphQLObjectType({
  name: "UserPages",
  description: "UserPages type",
  fields: () => ({
    id: { type: GraphQLID },
    autor: {
      type: UserType,
      resolve: (userPages) => User.findById(userPages.user),
    },
    nombre: { type: GraphQLString },
    listHtml: { type: new GraphQLList(GraphQLString) },
    mostrarNavbar: { type: GraphQLBoolean },
  }),
});

module.exports = {
  UserType,
  BloqueHtmlType,
  PlantillaHtmlType,
  UserPagesType,
};
