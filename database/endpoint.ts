/*
@author LxingA
@project CodeInk
@name API
@description Definición del Interfaz para el Objeto con la Información de los Puntos Finales del Proyecto
@date 18/02/2024 06:20PM
*/
import {Schema,model} from 'mongoose';
import {$Language$} from '../util/object';
import type {Language} from '../type/database';
import type Prototype from '../type/endpoint';

/** Definición de la Esquema para los Puntos Finales del Proyecto */
const EndPoint = (new Schema({
    /** Identificador Único del Punto Final en Formato UUID */
    _id: {
        required: false,
        type: Schema["Types"]["ObjectId"],
        auto: true
    },
    /** Nombre Corto Identificable para el Punto Final */
    name: {
        required: [true,"Se requiere de un nombre corto amigable para el punto final"],
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        min: 3,
        max: 16,
        validate: {
            validator: ($value:string) => /^[a-z]+$/["test"]($value),
            message: "El nombre dado para el identificador amigable del punto final no es valido"
        }
    },
    /** Indicar sí el Punto Final está Activo en el Proyecto */
    active: {
        required: false,
        type: Boolean,
        default: false,
        validate: {
            validator: ($value:boolean) => (typeof($value) == "boolean"),
            message: "El tipo de dato para establecer la activación del punto final no es valido"
        }
    },
    /** Establecer el Punto Final con el Protocolo SSL (HTTPS) */
    secure: {
        required: false,
        type: Boolean,
        default: true,
        validate: {
            validator: ($value:boolean) => (typeof($value) == "boolean"),
            message: "El tipo de dato para establecer el protocolo de seguridad al punto final no es valido"
        }
    },
    /** Nombre del Sufijo como Subdominio para el Punto Final */
    suffix: {
        required: false,
        type: String,
        lowercase: true,
        trim: true,
        unique: false,
        min: 1,
        max: 32,
        default: "www",
        validate: {
            validator: ($value:string) => /^[a-z]+$/["test"]($value),
            message: "El sufijo para el subdominio del punto final no es valido"
        }
    },
    /** Identificador Único del Dominio Público Asociado al Punto Final */
    domain: {
        required: [true,"Se requiere de un dominio público principal para el punto final"],
        type: Schema["Types"]["ObjectId"]
    },
    /** Descripción Acerca del Propósito del Punto Final */
    description: {
        required: false,
        type: Object,
        default: {
            es: "No se ha definido aún una descripción acerca del punto final"
        },
        validate: {
            validator: ($value$:Language) => $Language$($value$,{
                $max$: 100,
                $min$: 8,
                $regex$: /\s/g,
                $trim$: false
            }),
            message: "La descripción dada no cumple con un formato valído"
        }
    }
},{timestamps:true,collection:"endpoint"}));

/** Definición del Modelo de los Puntos Finales en Base de una Esquema Definida */
export default model<Prototype>("subdominios",EndPoint);