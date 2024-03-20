/*
@author LxingA
@project CodeInk
@name API
@description Definición del Prototipo para los Proyectos del Proyecto
@date 19/02/2024 10:30PM
*/
import type {Schema} from 'mongoose';
import type Database,{Language} from './database';
import type Domain from './domain';

/** Objeto para la Definición del Tipo para las Redes Sociales */
export type Social = {
    /** Nombre de la Red Social para Identificarla */
    name: string,
    /** Nombre de la Red Social para Mostrar */
    label: string,
    /** Ruta Absoluta HTTP para el Acceso a la Red Social */
    url: string,
    /** Indica sí la Red Social está Habilitada */
    active: boolean,
    /** Nombre del Icono de la Red Social */
    icon: string
};

/** Objeto con la Información de la Geolocalización */
export type Location = {
    /** Nombre del Estado de la Localización del Proyecto */
    state: string,
    /** Nombre de la Ciudad de la Localización del Proyecto */
    city: string,
    /** Nombre del País de la Localización del Proyecto */
    country: string,
    /** Código Postal de la Localización del Proyecto */
    postal?: number,
    /** Nombre de la Colonia de la Localización del Proyecto */
    colony?: string,
    /** Nombre de la Dirección de la Localización del Proyecto */
    street?: string,
    /** Número Exterior de la Localización del Proyecto */
    exterior?: number
};

/** Definición del Interfaz de los Proyectos del Proyecto */
interface Project extends Database {
    /** Nombre Identificador para el Proyecto */
    name: string,
    /** Indicar sí el Proyecto está Habilitado en el Proyecto */
    active?: boolean,
    /** Contenedor con los Nombres Alternos del Proyecto */
    alternative?: string[],
    /** Número de Telefóno Principal Asociada al Proyecto */
    telephone?: string,
    /** Identificador Único (ó objeto con la información) del Dominio Público Asociada al Proyecto */
    domain: Schema.Types.ObjectId | Domain,
    /** Descripción Acerca del Propósito del Proyecto en el Proyecto */
    description?: Language,
    /** Correo Electrónico de Contacto del Proyecto */
    mail: string,
    /** Objeto con la Información de la Localización del Proyecto */
    location?: Location,
    /** Contenedor con las Redes Sociales del Proyecto */
    social?: Social[]
};

export default Project;