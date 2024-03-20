/*
@author LxingA
@project CodeInk
@name API
@description Definición del Prototipo para el Contexto Global del Rutador de la API
@date 02/03/2024 12:30AM
*/
import type {Application} from '../parameter';
import type Project from "../project";

/** Definición del Objeto para la Información de Google Analytics para los Servicios */
type Analytic = {
    /** Clave Identificable de Google Analytic para el Servicio */
    key: string,
    /** Clave Única del Identificador de Google Analytic para el Servicio */
    identified: string,
    /** Ruta Absoluta HTTP del Punto Final del Acceso al Google Tag Manager */
    endpoint: string
};

/** Definición del Objeto con la Información del Servicio a Retornar en la API */
export type Service = {
    /** Nombre del Servicio */
    name: string,
    /** Mensaje Descriptivo del Servicio */
    slogan: string,
    /** Descripción más Acerca del Servicio */
    description: string,
    /** Objeto con los Puntos Finales Esenciales para el Servicio */
    endpoint: Record<string,string>,
    /** Versión Actual del Servicio */
    version: string,
    /** Nombre del Identificador del Servicio */
    identified: string,
    /** Objeto con la Información del Proyecto Asociada al Servicio */
    project: Project,
    /** Objeto con la Información de Google Analytics para los Servicios */
    analytic: Analytic,
    /** Objeto con la Información Esencial del Servicio */
    option: Application,
    /** Objeto con la Información General Adicional del Servicio */
    general?: Record<string,any>,
    /** Contenedor con las Palabras Claves para el SEO del Servicio */
    keywords?: string[],
    /** Indicar sí el Estilo de la Aplicación se Renderizará de Forma Local o mediante la CDN */
    localStyle: boolean
};