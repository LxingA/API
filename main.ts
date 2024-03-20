/*
@author LxingA
@project CodeInk
@name API
@description Configuración Inicial de la API
@date 17/02/2024 04:30PM
*/
import 'dotenv/config';
import {createServer} from 'http';
import $directory$ from 'path';
import $engine$ from 'express';
import $header$ from 'helmet';
import $body$ from 'body-parser';
import $ip$ from 'request-ip';
import $Logger$ from './util/logger';

/** Instancia de Express como Servidor para la API */
const $server$ = $engine$();

/** Instanciar las Cabeceras Esenciales para el Servidor de la API */
$server$["use"]($header$["hidePoweredBy"]());
$server$["use"]($body$["json"]());
$server$["use"]($body$["urlencoded"]({extended:true}));
$server$["use"]($ip$["mw"]());

/** Establecer el Entorno sí la Aplicación está en Modo de Desarrollo */
$server$["set"]("dev",(process["env"]["CkAPIEnvironmentDefinedContextOnAPI"] == "development"));

/** Establecer PUG como Interprete de las Plantillas HTML de la API */
$server$["set"]("views",$directory$["join"](__dirname,"/../view"));
$server$["set"]("view engine","pug");

/** Instancia del Servidor HTTP para la API */
$Logger$({$message$:"Se instanció la inicialización de la API en el entorno de \""+process["env"]["CkAPIEnvironmentDefinedContextOnAPI"]+"\"",$context$:"init"});
const $web$ = createServer($server$);

export {$server$,$web$};