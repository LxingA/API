/*
@author LxingA
@project CodeInk
@name API
@description Inicialización de la Aplicación
@date 17/02/2024 06:10PM
*/
import 'dotenv/config';
import {$web$,$server$} from './main';
import {$Header$,$Security$} from './bin/middleware';
import {expressMiddleware} from '@apollo/server/express4';
import $GraphQL$,{$GraphQLContext$ as context} from './bin/graphql';
import $database$ from 'mongoose';
import $Async$ from './util/async';
import $Logger$ from './util/logger';
import $Router$ from './router';
import $Template$ from './util/template';
import $Secure$ from 'cors';
import $Parameters$ from './util/params';
import type {Response} from 'express';

/** Instanciar la Conexión con la Base de Datos para la Definición de la Conexión de HTTP de la API */
$database$["connect"](`mongodb+srv://${process["env"]["CkAPIEnvironmentDatabaseUser"]}:${process["env"]["CkAPIEnvironmentDatabasePass"]}@${process["env"]["CkAPIEnvironmentDatabaseHost"]}/?retryWrites=true&w=majority&appName=${process["env"]["CkAPIEnvironmentDatabaseName"]}`,{dbName:"global",autoIndex:$server$["get"]("dev"),autoCreate:$server$["get"]("dev")})["then"](_ => {
    $Logger$({$message$:"Se instanció con éxito la conexión con la Base de Datos Local...",$context$:"database",$type$:"ok"});
    $Logger$({$message$:"Se procede a inicializar el Servidor GraphQL para la API...",$context$:"graphql",$type$:"info"});
    $GraphQL$["start"]()["then"](_ => {
        $Logger$({$message$:"Se instanció la inicialización del Servidor GraphQL en la ruta \/graphql",$context$:"graphql",$type$:"ok"});
        $Logger$({$message$:"Se procede a inicializar la configuración esencial a la API...",$context$:"parameters",$type$:"info"});
        $Parameters$()["then"]($ => {
            $Logger$({$message$:"Se instanció de forma correcta la obtención de los parámetros globales del proyecto... Se procede a instanciar el servidor",$context$:"initial",$type$:"ok"});
            (!$server$["get"]("dev")) && $server$["use"]($Secure$({exposedHeaders:$["CkGlobParamAPI"]["HTTPHeader"],methods:$["CkGlobParamAPI"]["HTTPMethod"]}));
            (!$server$["get"]("dev")) && $server$["all"]("*",[$Async$($Header$),$Async$($Security$)]);
            $server$["use"]("/graphql",expressMiddleware($GraphQL$,{context}));
            $server$["use"]("/",$Router$);
            $server$["all"]("*",async(_:any,$:Response)=>$["status"](200)["render"]("default.pug",(await $Template$({}))));
            $web$["listen"](process["env"]["CkAPIEnvironmentPortListenHTTP"],() => $Logger$({$message$:"Se instanció con éxito el servidor HTTP con el puerto local "+process["env"]["CkAPIEnvironmentPortListenHTTP"]}));
        })["catch"]($error$ => $Logger$({$message$:"Hubo un error a obtener los parámetros globales del proyecto con el siguiente mensaje \""+$error$+"\"",$context$:"parameters",$type$:"critic"}));
    })["catch"]($error$ => $Logger$({$message$:"Hubo un error a inicializar el Servidor GraphQL con el siguiente mensaje \""+$error$+"\"",$context$:"graphql",$type$:"critic"}));
})["catch"]($error$ => $Logger$({$message$:"Hubo un error a establecer la conexión con la Base de Datos con el siguiente mensaje \""+($error$ ?? "desconocido")+"\"",$type$:"critic",$context$:"database"}));