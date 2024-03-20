/*
@author LxingA
@project CodeInk
@name API
@description Integración de Firebase para el Acceso a los Parámetros Globales del Proyecto
@date 09/03/2024 11:30PM
*/
import $Engine$ from 'firebase-admin';
import $Config$ from '../firebase.json';
import type {ServiceAccount} from 'firebase-admin';

/** Inicialización de Firebase en el Servidor API */
const $Firebase$ = ($Engine$["initializeApp"]({
    credential: $Engine$["credential"]["cert"]($Config$ as ServiceAccount)
}))["remoteConfig"]();

export default $Firebase$;