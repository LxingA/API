/*
@author LxingA
@project CodeInk
@name API
@description Definición de los Prototipos para la Aplicación "Shortener"
@date 17/03/24 05:30PM
*/
import type Database,{Language} from "../database";

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