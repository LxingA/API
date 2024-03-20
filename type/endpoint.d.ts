/*
@author LxingA
@project CodeInk
@name API
@description Definición del Prototipo para los Puntos Finales del Proyecto
@date 18/02/2024 06:20PM
*/
import type {Schema} from 'mongoose';
import type Database,{Language} from "./database";
import type Domain from './domain';

/** Definición del Interfaz de los Puntos Finales del Proyecto */
interface EndPoint extends Database {
    /** Nombre Amigable para la Identificación del Punto Final en el Proyecto */
    name: string,
    /** Indicar sí el Punto Final está Activo en el Proyecto */
    active?: boolean,
    /** Establecer el Punto Final con el Protocolo SSL para el Proyecto */
    secure?: boolean,
    /** Nombre del Sufijo como Subdominio para el Punto Final del Proyecto */
    suffix?: string,
    /** Identificador Único (ó objeto con la información) del Dominio Público Asociado al Punto Final del Proyecto */
    domain: Schema.Types.ObjectId | Domain,
    /** Descripción Acerca del Propósito del Punto Final en el Proyecto */
    description?: Language
};

export default EndPoint;