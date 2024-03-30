/*
@author LxingA
@project CodeInk
@name API
@description Definición de los Prototipos para la Aplicación "Media"
@date 19/03/2024 06:00PM
*/
import type Database,{Language} from "../database";

/** Definición del Objeto para la Solicitud de la Consulta al Almacenamiento CDN del Proyecto */
export type MediaStorage = {
    /** Ruta Relativa a Buscar en el Cubo del Almacenamiento */
    path: string,
    /** Definición en el Objeto con las Imágenes del Medio */
    name: string
};

/** Definición de los Tipos de Medios Disponibles en la Aplicación */
export type MediaType = "anime" | "game" | "music" | "video" | "unknown";

/** Tipo para la Definición de las SubCategorías */
export type CategoryChildren = {
    /** Nombre de la Etiqueta para la SubCategoría */
    label: Language,
    /** Identificador Único de la SubCategoría (8) */
    identified?: string
};

/** Tipo para la Definición del Objeto para las Categorías en el Medio */
export type MediaCategory = {
    /** Identificador Único de la Categoría */
    id: string,
    /** Nombre de Etiqueta para la Categoría */
    label: string,
    /** Contenedor con los SubCategorías de la Categoría Obtenida */
    item: CategoryChildren[]
};

/** Definición de la Interfaz para las Categorías de la Aplicación */
export interface Category extends Database {
    /** Nombre de la Categoría */
    name: Language,
    /** Descripción Acerca del Propósito de la Categoría */
    description?: Language,
    /** Índica sí la Categoría está Habilitada en la Aplicación */
    active?: boolean,
    /** Objeto con las SubCategorías de la Categoría */
    children?: Record<string,CategoryChildren> | CategoryChildren[],
    /** Contenedor con los Contextos de la Aplicación para el Acceso a la Categoría */
    allow?: MediaType[],
    /** Identificador Único para la Categoría (8) */
    identified: string
};

/** Definición de la Interfaz para los Medios de la Aplicación */
export interface Media extends Database {
    /** Nombre del Medio Original sin Alteraciones */
    name: string,
    /** Descripción Acerca del Medio en Punto de Vista del Administrador */
    description?: Language,
    /** Número de Calificación del Medio (1~5) */
    rate?: number,
    /** Indicar sí el Medio está Habilitado en la Aplicación */
    active?: boolean,
    /** Objeto con las Categorías Asociadas al Medio */
    meta?: Record<string,string[]>,
    /** Objeto con la Información de las Imágenes del Medio */
    media: {
        /** Ruta Relativa de la Portada del Medio */
        cover?: string,
        /** Ruta Relativa del Fondo de Pantalla del Medio */
        background?: string,
        /** Contenedor con las Capturas de Pantalla del Medio */
        snapshot?: string[]
    },
    /** Identificador Único del Medio */
    identified: string
};