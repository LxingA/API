/*
@author LxingA
@project CodeInk
@name API
@description Definición del Prototipo para las Aplicaciones del Proyecto
@date 20/02/2024 04:30PM
*/
import type {Schema} from 'mongoose';
import type Database,{Language} from "./database";
import type Project from './project';

/** Definición del Interfaz de las Aplicaciones del Proyecto */
interface Application extends Database {
    /** Nombre de la Aplicación de forma Amigable (ckapp-**) */
    name: string,
    /** Titulo de la Aplicación en Mostrar en las Aplicaciones */
    title: string,
    /** Definición de un Subtitulo Descriptivo para la Aplicación */
    slogan?: Language,
    /** Indicar sí la Aplicación está Habilitado en el Proyecto */
    active?: boolean,
    /** Identificador Único (ó el objeto con la información) del Proyecto Asociada a la Aplicación */
    project: Schema.Types.ObjectId | Project,
    /** Descripción Acerca del Propósito de la Aplicación */
    description?: Language,
    /** Identificador Único de la Aplicación en Formato UUID */
    key: string,
    /** Indicar la Versión Actual de la Aplicación (0.0.0) */
    version?: string,
    /** Identificador de Google Analytic de la Aplicación en Formato MEDICIÓN:FLUJO */
    analytic: string,
    /** Definir el Tipo de Entorno de la Aplicación */
    type: "service" | "web" | "game" | "mobile" | "desktop",
    /** Objeto con la Información Global de la Aplicación */
    global?: Record<string,any>,
    /** Contenedor con las Claves Clave para el SEO de la Aplicación */
    keywords?: string[],
    /** Indicar sí el Estilo de la Aplicación se Renderizará de Forma Local o mediante la CDN */
    localStyle: boolean
};

export default Application;