/*
@author LxingA
@project CodeInk
@name API
@description Definición de los Prototipos para la Aplicación "InkExpress"
@date 10/03/2024 12:30AM
*/
import type Database,{Language} from "../database";

/** Definición del Tipo para las Plantillas de los Productos */
export type Template = {
    /** Definir el Prototipo para Mostrar la Plantilla */
    format: string,
    /** Definir el Tipo de Articulo a Mostrar */
    type: Language | string
};

/** Definición del Tipo para los Productos */
export type Product = {
    /** Nombre del Producto */
    name: Language | string,
    /** Precio en Pesos Méxicanos del Producto */
    price?: number,
    /** Definición de un Texto a Base de una Plantilla para el SprintF de la Aplicación */
    template?: Template
};

/** Definición de la Interfaz para las Categorías con los Productos de la Aplicación */
export interface Category extends Database {
    /** Titulo de la Categoría */
    title: Language | string,
    /** Contenedor con las SubCategorías para la Categoría */
    subtitle?: Language[],
    /** Contenedor con los Productos para la Categoría */
    product: Product[] | Product[][] | Record<string,Product[]>,
    /** Definición de un Mensaje de Advertencía para la Categoría */
    message?: Language | string,
    /** Nombre del Archivo de la Imagén a Mostrar en la Categoría */
    image?: string
};