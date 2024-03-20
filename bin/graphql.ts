/*
@author LxingA
@project CodeInk
@name API
@description Integración de Apollo GraphQL como Servidor HTTP
@date 09/03/24 08:00PM
*/
import {$server$} from '../main';
import {ApolloServer} from '@apollo/server';
import {ApolloServerPluginCacheControl} from '@apollo/server/plugin/cacheControl';
import {ApolloServerPluginLandingPageProductionDefault,ApolloServerPluginLandingPageLocalDefault} from '@apollo/server/plugin/landingPage/default';
import {ApolloServerPluginInlineTraceDisabled,ApolloServerPluginSchemaReportingDisabled,ApolloServerPluginUsageReportingDisabled} from '@apollo/server/plugin/disabled';
import $Schema$ from '../graphql';
import $Parameters$ from '../util/params';
import type {ContextFunction} from '@apollo/server';
import type {ExpressContextFunctionArgument} from '@apollo/server/express4';
import type Prototype from '../type/graphql/context';

/** Función Esencial para la Definición de los Contextos del Servidor GraphQL */
export const $GraphQLContext$: ContextFunction<[ExpressContextFunctionArgument],Prototype> = async({req}) => {
    const $__headers__$ = (await $Parameters$())["CkGlobParamAPI"]["HTTPHeader"];
    return ({
        language: req["header"]($__headers__$[1]) ?? "es"
    });
};

/** Definición de la Instancia de Apollo GraphQL para el Servidor API */
const $GraphQL$ = (new ApolloServer<Prototype>({
    plugins: [
        ApolloServerPluginInlineTraceDisabled(),
        ApolloServerPluginSchemaReportingDisabled(),
        ApolloServerPluginUsageReportingDisabled(),
        ApolloServerPluginCacheControl({
            defaultMaxAge: 1800,
            calculateHttpHeaders: false
        }),
        ($server$["get"]("dev")) ? ApolloServerPluginLandingPageLocalDefault({footer:false}) : ApolloServerPluginLandingPageProductionDefault({footer:false})
    ],
    schema: $Schema$,
    csrfPrevention: true,
    includeStacktraceInErrorResponses: false,
    status400ForVariableCoercionErrors: true,
    allowBatchedHttpRequests: true
}));

export default $GraphQL$;