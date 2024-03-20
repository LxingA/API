/*
@author LxingA
@project CodeInk
@name API
@description Definición del Rutador v1 de la API
@date 01/03/2024 07:50PM
*/
import {Router} from 'express';
import $Global_Router$ from './context/global';
import $Shortener_Router$ from './context/shortener';

/** Definición del Contexto para la Versión 1 de la API */
const $__router__$ = Router();

/** Definición del Contexto Global para la API */
$__router__$["use"]("/global",$Global_Router$);

/** Definición del Contexto Shortener para la API */
$__router__$["use"]("/shortener",$Shortener_Router$);

export default $__router__$;