/*
@author LxingA
@project CodeInk
@name API
@description Definición de los Prototipos para la Aplicación "Media"
@date 19/03/2024 06:00PM
*/
import type Database,{Language} from "../database";

/** Definición de los Tipos de Medios Disponibles en la Aplicación */
export type MediaType = "anime" | "game" | "music" | "video" | "unknown";

/** Tipo para la Definición de las SubCategorías */
export type CategoryChildren = {
    /** Nombre de la Etiqueta para la SubCategoría */
    label: Language,
    /** Identificador Único de la SubCategoría */
    identified?: string
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
    allow?: MediaType[]
};

/** Definición de la Interfaz para los Animes de la Aplicación */
export interface Anime extends Database {
    /** Nombre del Anime Original en Romaji */
    name: string,
    /** Descripción Acerca del Anime en Punto de Vista del Administrador */
    description?: Language,
    /** Número de Calificación del Anime (1~5) */
    rate?: number,
    /** Indicar sí el Anime está Habilitado en la Aplicación */
    active?: boolean,
    /** Objeto con las Categorías Asociadas al Anime */
    meta?: Record<string,string[]>
};