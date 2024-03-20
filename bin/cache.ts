/*
@author LxingA
@project CodeInk
@name API
@description Definición de la Instancia de Cache para la API
@date 20/02/2024 07:00PM
*/
import $Engine$ from 'node-cache';

/** Referencia a la Instancia de Node Cache para la API */
const $Cache$ = (new $Engine$({
    stdTTL: 3600,
    checkperiod: 1500
}));

export default $Cache$;