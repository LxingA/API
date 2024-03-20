/*
@author LxingA
@project CodeInk
@name API
@description Definición del Interfaz para el Objeto con la Información de las Aplicaciones del Proyecto
@date 20/02/2024 02:30AM
*/
import {Schema,model} from 'mongoose';
import {$Language$} from '../util/object';
import type {Language} from '../type/database';

/** Definición de la Esquema para las Aplicaciones del Proyecto */
const Application = (new Schema({
    /** Identificador Único de la Aplicación en Formato UUID */
    _id: {
        required: false,
        type: Schema["Types"]["ObjectId"],
        auto: true
    },
    /** Nombre Amigable de la Aplicación */
    name: {
        required: [true,"Se requiere de un nombre identificable corto para la aplicación"],
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        min: 8,
        max: 16,
        validate: {
            validator: ($value:string) => /^ckapp\-([a-z]+)$/["test"]($value),
            message: "El nombre identificable corto para la aplicación no es valida"
        }
    },
    /** Titulo Amigable de la Aplicación */
    title: {
        required: [true,"Se requiere de un titulo para la aplicación"],
        type: String,
        min: 4,
        max: 32,
        validate: {
            validator: ($value:string) => /^[a-zA-Z0-9 ]+$/["test"]($value),
            message: "El titulo dado para la aplicación no es valido"
        }
    },
    /** Definición de un Titulo Descriptivo para la Aplicación */
    slogan: {
        required: false,
        type: Object,
        default: {
            es: "Una Simple Aplicación del Proyecto"
        },
        validate: {
            validator: ($value$:Language): boolean => $Language$($value$,{
                $max$: 200,
                $min$: 4,
                $regex$: /\s/g,
                $trim$: false
            }),
            message: "El eslogan de la aplicación no es valida"
        }
    },
    /** Indicar sí la Aplicación está Habilitado en el Proyecto */
    active: {
        required: false,
        type: Boolean,
        default: false,
        validate: {
            validator: ($value:boolean) => (typeof($value) == "boolean"),
            message: "El tipo de dato para establecer la activación de la aplicación no es valido"
        }
    },
    /** Identificador Único del Proyecto Asociado a la Aplicación */
    project: {
        required: [true,"Se requiere de una referencia de un proyecto para la aplicación"],
        type: Schema["Types"]["ObjectId"]
    },
    /** Descripción Acerca del Propósito de la Aplicación */
    description: {
        required: false,
        type: Object,
        default: {
            es: "No se ha definido aún una descripción acerca de la aplicación"
        },
        validate: {
            validator: ($value$:Language) => $Language$($value$,{
                $max$: 200,
                $min$: 8,
                $regex$: /\s/g,
                $trim$: false
            }),
            message: "La descripción dada no cumple con un formato valído"
        }
    },
    /** Identificador Único UUID de la Aplicación */
    key: {
        required: true,
        type: String,
        min: 16,
        max: 36,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: ($value:string) => /^([a-z0-9]){8}\-(([a-z0-9]){4}\-){3}([a-z0-9]){12}$/["test"]($value),
            message: "El identificador único UUID de la aplicación no es valida"
        }
    },
    /** Establecer una Versión de Edición para la Aplicación */
    version: {
        required: false,
        type: String,
        default: "1.0.0",
        min: 6,
        max: 64,
        trim: true,
        validate: {
            validator: ($value:string) => /^(([0-9]){1,3}(\.)?){3}$/["test"]($value),
            message: "La estructura de la definición dada no es una versión valida"
        }
    },
    /** Identificador Único de Google Analytic para la Aplicación */
    analytic: {
        required: true,
        type: String,
        trim: true,
        uppercase: true,
        unique: false,
        validate: {
            validator: ($value:string) => /^G\-([A-Z0-9]+)\:[0-9]+$/["test"]($value),
            message: "La estructura de la definición dada no es un identificador de google analytic valido"
        }
    },
    /** Definir el Tipo de Entorno de la Aplicación */
    type: {
        required: false,
        type: String,
        default: "web",
        min: 3,
        max: 10,
        lowercase: true,
        trim: true,
        unique: false,
        validate: {
            validator: ($value:string) => /^[a-z]+$/["test"]($value),
            message: "La definición del tipo de aplicación no cumple con el formato establecido por lo que no es valido"
        }
    },
    /** Definición del Objeto con la Información Adicional de la Aplicación */
    global: {
        required: false,
        type: Object,
        default: {}
    },
    /** Definición del Contenedor con Todas las Palabras Claves para el SEO de la Aplicación */
    keywords: {
        required: false,
        type: Array,
        default: []
    },
    /** Indicar sí el Estilo se Renderizará mediante la CDN ó de Forma Local para la Aplicación */
    localStyle: {
        required: [true,"Se requiere especificar sí el estilo es de tipo local"],
        type: Boolean,
        unique: false,
        validate: {
            validator: ($value:boolean) => (typeof($value) == "boolean"),
            message: "El indicador para definir el estilo local no cumple con el formato establecido"
        }
    }
},{timestamps:true,collection:"application"}));

/** Definición del Modelo de las Aplicaciones en Base de una Esquema Definida */
export default model("apps",Application);