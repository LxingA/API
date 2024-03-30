/*
@author LxingA
@project CodeInk
@name API
@description Prototipo para la Definición del Objeto con los Parámetros Globales del Proyecto
@date 09/03/2024 11:30PM
*/

/** Definición del Prototipo para los Parámetros Esenciales de las Aplicaciones */
export type Application = {
    /** Contenedor con los Idiomas Disponibles en el Proyecto */
    languages: {
        /** Nombre del Lenguaje Humano */
        label: string,
        /** Abreviatura del Lenguaje en ISO */
        iso: string,
        /** Establecer cómo un Idioma Principal del Proyecto */
        index: boolean
    }[],
    /** Objeto con los Parámetros HTML a Establecer en las Aplicaciones del Proyecto */
    $html$: Record<string,boolean>,
    /** Definición del Tema Obscuro en las Aplicaciones del Proyecto */
    dark: boolean
};

/** Definición del Prototipo para los Parámetros Esenciales de la API */
export type API = {
    /** Contenedor con los Métodos HTTP permitidos en la API Global */
    HTTPMethod: string[],
    /** Contenedor con las Cabeceras HTTP permitidas en la API Global */
    HTTPHeader: string[],
    /** Contenedor con los Órigenes HTTP autorizadas en la API Global */
    SecureOriginHTTP: string[],
    /** Contenedor con las Direcciones IPv4 o IPv6 autorizadas en la API Global */
    SecureOriginIP: string[],
    /** Identificador Secreto para el Acceso a la API para las Aplicaciones Nativas del Proyecto */
    SecretAccessByNativeApps: string
};

/** Prototipo con los Parámetros Globales del Proyecto */
interface Parameters {
    /** Nombre del Diseñador Web del Proyecto */
    CkGlobAuthorDesigner: string,
    /** Nombre del Desarrollador Web del Proyecto */
    CkGlobAuthorDeveloper: string,
    /** Nombre del Traductor General de las Aplicaciones del Proyecto */
    CkGlobAuthorTranslater: string,
    /** Objeto con los Parámetros Esenciales de la API Global */
    CkGlobParamAPI: API,
    /** Objeto con los Parámetros Globales de las Aplicaciones del Proyecto */
    CkGlobParamAPP: Application,
    /** Objeto con las Claves de Acceso a los Cubos de Almenamiento del Proyecto */
    CkGlobCDNStorageZone: Record<string,string>
};

/** Definición de la Interfaz para el Objeto de Respuesta de la API */
export interface APIResponse {
    /** Estado Actual de la Respuesta */
    $st$: boolean,
    /** Mensaje Opcional a Mostrar en la Respuesta */
    $ms$?: string,
    /** Dato de la Respuesta a Enviar en la Solicitud */
    $rs$: any,
    /** Tiempo en MS del Tiempo Actual de la Solicitud */
    $tt$: number
};

/** Prototipo del Objeto con la Información de un Paginador de un Aplicación */
export interface Pagination {
    /** Número de Elementos a Mostrar por Página */
    perPage: number,
    /** Página Actual en el Paginador */
    currentPage: number,
    /** Número Total de Elementos de la Base de Datos */
    total: number
};

/** Definición de la Respuesta para la Paginación del Proyecto */
export interface PaginationResponse {
    /** Contenedor con Todos los Elementos Manipulados para Mostrar */
    item: [],
    /** Objeto con la Información Total de Elementos Obtenidos */
    total: {
        /** Total de Páginas a Mostrar en el DOM */
        pages: number,
        /** Total de Elementos a Mostrar en el DOM */
        elements: number
    }
};

export default Parameters;