/*
@author LxingA
@project CodeInk
@name API
@description Definición del Interfaz del Objeto con los Parámetros Padre de la Base de Datos del Proyecto
@date 17/02/2024 09:30PM
*/
import type {Schema} from 'mongoose';

/** Definición del Tipo para los Idiomas del Proyecto */
export type Language = Record<string,string>;

/** Definición del Prototipo con los Parámetros Esenciales de la Base de Datos */
interface Database {
    /** Identificador Único del Elemento */
    readonly _id?: Schema.Types.ObjectId,
    /** Fecha de Creación del Elemento */
    readonly createdAt?: Schema.Types.Date,
    /** Fecha de Modificación del Elemento */
    readonly updatedAt?: Schema.Types.Date,
    /** Número de Versión del Elemento */
    readonly __v?: Schema.Types.Number
}

export default Database;