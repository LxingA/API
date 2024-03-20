/*
@author LxingA
@project CodeInk
@name API
@description Utilidad para la Definición de las Funciones Asincrononas para los Middleware de la API
@date 22/02/2024 06:15PM
*/
import {$server$} from '../main';
import {middleware as $Core$} from 'apicache';
import type {Request,Response,NextFunction} from 'express';

/** Función Esencial para Ejecutar Funciones Asincrononas en los Middleware de la API */
const $Async$ = ($fn:($rq:Request,$rs:Response,$nt:NextFunction) => Promise<void>) => ($rq:Request,$rs:Response,$nt:NextFunction) => Promise["resolve"]($fn($rq,$rs,$nt))["catch"]($nt);

/** Funcionalidad Esencial para la Definición del Middleware Cache para los Rutadores de la API */
export const $Cache$ = ($time$:string = "1 hour") => ($server$["get"]("dev") ? [] : [$Core$($time$)]);

export default $Async$;