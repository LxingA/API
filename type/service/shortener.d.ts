/*
@author LxingA
@project CodeInk
@name API
@description Definición de los Prototipos para la Aplicación "Shortener"
@date 17/03/24 05:30PM
*/
import type Database,{Language} from "../database";

/** Prototipo para la Definición de los Usuarios de la Aplicación */
export interface User extends Database {
    /** Nombre Completo del Usuario en la Aplicación */
    name?: string,
    /** Apodo Completo del Usuario en la Aplicación */
    nick: string,
    /** Correo Electrónico del Usuario en la Aplicación */
    mail: string,
    /** Contraseña del Usuario Encriptado en la Aplicación */
    password: string
};

/** Definición de la Interfaz para los Enlaces Acortados de la Aplicación */
export interface Link extends Database {
    /** Nombre Identificador del Enlace Acortado */
    name: string,
    /** Ruta Absoluta HTTP de la Dirección a Redirecionar el Enlace Acortado */
    uri: string,
    /** Indicar sí el Enlace Acortado está Habilitado */
    active: boolean,
    /** Total de Visitas del Enlace Acortado */
    view: number,
    /** Descripción Acerca del Enlace Acortado */
    description?: Language | string
};