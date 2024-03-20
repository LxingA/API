/*
@author LxingA
@project CodeInk
@name API
@description Definición de las Esquemas Generales para la Aplicación "Media" en la Base de Datos del Proyecto
@date 19/03/24 03:00PM
*/
import {Schema,model} from 'mongoose';
import {$Language$} from '../../util/object';
import type {Language} from '../../type/database';
const $prefix$ = ($:string) => `_media_${$}`;

/** Definición de la Esquema para las Categorías de la Aplicación */
export const $Category$ = (model("media_category",(new Schema({
    /** Identificador Único de la Categoría */
    _id: {
        required: false,
        type: Schema["Types"]["ObjectId"],
        auto: true
    },
    /** Nombre de la Categoría */
    name: {
        required: [true,"Se requiere de un nombre para la categoría"],
        type: Object,
        validate: {
            validator: ($value$:Language) => $Language$($value$,{
                $max$: 100,
                $min$: 3,
                $regex$: /[a-zA-Z0-9À-ÿ\u00f1\u00d1\-]/g,
                $trim$: false
            }),
            message: "El nombre de la categoría dado, no cumple con el formato establecido"
        }
    },
    /** Descripción Acerca del Propósito de la Categoría */
    description: {
        required: false,
        type: Object,
        default: {
            es: "No se ha definido aún una descripción acerca de la categoría",
            en: "A description of the category has not yet been defined"
        },
        validate: {
            validator: ($value$:Language) => $Language$($value$,{
                $max$: 200,
                $min$: 8,
                $regex$: /\s/g,
                $trim$: false
            })
        }
    },
    /** Indica sí la Categoría está Habilitada para el Filtro de la Aplicación */
    active: {
        required: false,
        type: Boolean,
        default: false,
        validate: {
            validator: ($value$:boolean) => (typeof $value$ == "boolean"),
            message: "El tipo de dato para habilitar la categoría, no cumple con el formato establecido" 
        }
    },
    /** Definición de las SubCategorías de una Categoría */
    children: {
        required: false,
        type: Object,
        validate: {
            validator: ($value$:[]) => (typeof $value$ == "object"),
            message: "El objeto para las subcategorías dado, no cumple con el formato establecido"
        }
    },
    /** Contenedor con los Contextos de la Aplicación para Mostrar en los Filtros */
    allow: {
        required: false,
        type: Array,
        value: {
            validator: ($value$:[]) => ($value$ instanceof Array),
            message: "El contenedor con los contextos permitidos, no cumple con el formato establecido"
        }
    }
},{collection:$prefix$("category"),timestamps:true}))));

/** Definición de la Esquema para los Animes de la Aplicación */
export const $Anime$ = (model("media_anime",(new Schema({
    /** Identificador Único del Anime */
    _id: {
        required: false,
        type: Schema["Types"]["ObjectId"],
        auto: true
    },
    /** Definición del Nombre del Título del Anime */
    name: {
        required: [true,"Se requiere de un nombre para el anime"],
        type: String,
        unique: true,
        min: 3,
        max: 300,
        validate: {
            validator: ($value$:string) => /^[a-zA-Z0-9 \-]+$/["test"]($value$),
            message: "El nombre del anime proporcionado no cumple con el formato establecido"
        }
    },
    /** Definición de la Descripción Acerca del Propósito del Anime con Punto de Vista del Administrador */
    description: {
        required: false,
        type: Object,
        unique: false,
        default: {
            es: "Todavía no he visto el anime y no he tenido una expectación respecto a ello. Cuándo finalicé el anime, daré mi opinión sobre ello",
            en: "I haven't seen the anime yet and I haven't had any expectations about it. When I finished the anime, I will give my opinion on it"
        },
        validate: {
            validator: ($value$:Language) => $Language$($value$,{
                $max$: 800,
                $min$: 16,
                $regex$: /[a-zA-Z0-9À-ÿ\u00f1\u00d1\-\:\,\. ]+/g,
                $trim$: false
            }),
            message: "La descripción acerca del anime dado, no cumple con el formato establecido"
        }
    },
    /** Definición de una Calificación de Satisfacción del Anime */
    rate: {
        required: false,
        type: Number,
        unique: false,
        default: 0,
        validate: {
            validator: ($value$:number) => (typeof $value$ == "number"),
            message: "El número de calificación del anime dado, no tiene un formato valido"
        }
    },
    /** Activar el Anime en la Vista de Producción de la Aplicación */
    active: {
        required: false,
        type: Boolean,
        default: false,
        validate: {
            validator: ($value$:boolean) => (typeof $value$ == "boolean"),
            message: "El tipo de dato para habilitar el anime, no cumple con el formato establecido"
        }
    },
    /** Definición del Objeto con los Meta Datos Esenciales para el Anime string:[string] */
    meta: {
        required: [true,"Se requiere de un objeto con la información metadato para el anime"],
        type: Object,
        default: {},
        validate: {
            validator: ($value$:{}) => (typeof $value$ == "object"),
            message: "El contenedor con los metadatos del anime, no cumple con el formato establecido"
        }
    }
},{collection:$prefix$("anime"),timestamps:true}))));