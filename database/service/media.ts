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
                $regex$: /[a-zA-Z0-9À-ÿ\u00f1\u00d1\- ]/g,
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
    },
    /** Identificador Único para la Categoría (8) */
    identified: {
        required: [true,"Se requiere de un identificador para la categoría"],
        type: String,
        min: 4,
        max: 8,
        unique: true,
        trim: true,
        validate: {
            validator: ($value$:string) => (typeof($value$) == "string"),
            message: "El identificador para la categoría a asignar, no cumple con el formato establecido"
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
            es: "Todavía no se ha definido aún una descripción acerca del anime",
            en: "A description of the anime has not yet been defined"
        },
        validate: {
            validator: ($value$:{}) => (typeof $value$ == "object"),
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
    },
    /** Identificador Único del Anime (8L) */
    identified: {
        required: [true,"Se requiere de un identificador único para el anime"],
        type: String,
        trim: true,
        unique: true,
        min: 3,
        max: 8,
        validate: {
            validator: ($value$:string) => (typeof $value$ == "string"),
            message: "El identificador único para el anime, no cumple con el formato establecido"
        }
    }
},{collection:$prefix$("anime"),timestamps:true}))));

/** Definición de la Esquema para los Juegos de la Aplicación */
export const $Game$ = (model("media_game",(new Schema({
    /** Identificador Único del Juego */
    _id: {
        required: false,
        type: Schema["Types"]["ObjectId"],
        auto: true
    },
    /** Definición del Nombre del Juego Original */
    name: {
        required: [true,"Se requiere de un nombre para el juego"],
        type: String,
        unique: true,
        validate: {
            validator: ($value$:string) => (/^[A-Za-z0-9 \-]+$/["test"]($value$)),
            message: "El nombre del juego dado, no cumple con el formato establecido"
        }
    },
    /** Descripción Acerca del Juego */
    description: {
        required: false,
        type: Object,
        default: {
            es: "No se ha definido aún una descripción acerca del juego",
            en: "No description of the game has been defined yet"
        },
        validate: {
            validator: ($value$:{}) => (typeof($value$) == "object"),
            message: "La descripción acerca del juego dado, no cumple con el formato establecido"
        }
    },
    /** Definición de la Calificación del Juego */
    rate: {
        required: false,
        type: Number,
        unique: false,
        default: 1,
        validate: {
            validator: ($value$:number) => (typeof($value$) == "number"),
            message: "El número para el puntuaje del juego dado, no cumple con el formato establecido"
        }
    },
    /** Habilitar el Juego en la Aplicación */
    active: {
        required: false,
        type: Boolean,
        unique: false,
        default: false,
        validate: {
            validator: ($value$:boolean) => (typeof($value$) == "boolean"),
            message: "El tipo de dato para habilitar el juego, no cumple con el formato establecido"
        }
    },
    /** Objeto con la Información de las Categorías Asociadas al Juego */
    meta: {
        required: false,
        type: Object,
        unique: false,
        default: {},
        validate: {
            validator: ($value$:{}) => (typeof($value$) == "object"),
            message: "El objeto con la información de las categorías para el juego, no cumple con el formato establecido"
        }
    },
    /** Identificador Único para el Juego (8L) */
    identified: {
        required: [true,"Se requiere de un identificador único para el juego"],
        type: String,
        unique: true,
        trim: true,
        min: 4,
        max: 8,
        validate: {
            validator: ($value$:string) => (typeof($value$) == "string"),
            message: "El identificador único asignado al juego, no cumple con el formato establecido"
        }
    }
},{collection:$prefix$("game"),timestamps:true}))));