/*
@author LxingA
@project CodeInk
@name API
@description Definición de los Contextos de las Rutas de GraphQL en el Servidor Apollo
@date 09/03/24 08:00PM
*/
import {mergeTypeDefs,mergeResolvers} from '@graphql-tools/merge';
import {makeExecutableSchema} from '@graphql-tools/schema';
import {loadFilesSync} from '@graphql-tools/load-files';
import $Directory$ from 'path';

/** Definición de los Prototipos de GraphQL para el Servidor API */
const $GraphQLType$ = mergeTypeDefs(loadFilesSync($Directory$["join"](__dirname,"./types"),{extensions:["graphql"],ignoreIndex:true}));

/** Definición de los Mutadores de GraphQL para el Servidor API */
const $GraphQLResolver$ = mergeResolvers(loadFilesSync($Directory$["join"](__dirname,"./handlers"),{extensions:["js"],ignoreIndex:true}));

/** Definición del Esquema Global con los Prototipos y Mutadores para el Servidor API */
const $GraphQLSchema$ = makeExecutableSchema({typeDefs:$GraphQLType$,resolvers:$GraphQLResolver$});

export default $GraphQLSchema$;