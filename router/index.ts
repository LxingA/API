/*
@author LxingA
@project CodeInk
@name API
@description Definición del Rutador Principal para la API
@date 21/02/2024 03:50PM
*/
import {Router} from 'express';
import $path_v1$ from './v1';

/** Referencia a la Instancia del Rutador Principal para la API */
const $Router$ = Router();

/** Insercción de la Versión 1 de la Ruta para la API */
$Router$["use"]("/v1",$path_v1$);

export default $Router$;