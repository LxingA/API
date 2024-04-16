/*
@author LxingA
@project CodeInk
@name API
@description Definición de las Esquemas Generales para la Aplicación "Shortener" en la Base de Datos del Proyecto
@date 17/03/24 04:00PM
*/
import {Schema,model} from 'mongoose';
import {$Language$} from '../../util/object';
import type {Language} from '../../type/database';
const $prefix$ = ($:string) => `_shortener_${$}`;

/** Definición de la Esquema para los Enlaces Acortados de la Aplicación */
export const $Link$ = (model("link",(new Schema({
    /** Identificador Único del Enlace en la Aplicación */
    _id: {
        required: false,
        type: Schema["Types"]["ObjectId"],
        auto: true
    },
    /** Nombre Identificable del Enlace Acortado en la Aplicación */
    name: {
        required: [true,"Se requiere de un nombre para identificar el enlace acortado"],
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        min: 4,
        max: 8,
        validate: {
            validator: ($value:string) => /^[a-z]+$/["test"]($value),
            message: "El nombre identificable para el enlace acortado no es valido"
        }
    },
    /** Ruta Absoluta HTTP para el Enlace Acortado en la Aplicación */
    uri: {
        required: [true,"Se requiere de una ruta absoluta http del enlace a redireccionar"],
        type: String,
        lowercase: true,
        trim: true,
        unique: false,
        min: 8,
        max: 128,
        validate: {
            validator: ($value:string) => /^[a-z0-9\.\_\-\/\:\&\?\%\!\@\=\?]+$/["test"]($value),
            message: "La ruta absoluta http no tiene un formato valido"
        }
    },
    /** Indicar sí el Enlace Acortado está Habilitado en la Aplicación */
    active: {
        required: false,
        type: Boolean,
        default: false,
        validate: {
            validator: ($value:boolean) => (typeof $value == "boolean"),
            message: "El indicador sí el enlace acortado está habilitado no cumple con el formato establecido"
        }
    },
    /** Total de Visitas en el Enlace Acortado en la Aplicación */
    view: {
        required: false,
        type: Number,
        default: 0,
        validate: {
            validator: ($value:number) => (typeof $value == "number"),
            message: "El valor para el total de visitas del enlace acortado no cumple con el formato establecido"
        }
    },
    /** Descripción Acerca del Enlace Acortado en la Aplicación */
    description: {
        required: false,
        type: Object,
        validate: {
            validator: ($value:Language) => $Language$($value,{
                $max$: 200,
                $min$: 8,
                $regex$: /\s/g,
                $trim$: false
            }),
            message: "La descripción acerca del enlace acortado no cumple con el formato establecido"
        }
    }
},{collection:$prefix$("link"),timestamps:true}))));

/** Definición de la Esquema para los Usuarios Autorizados de la Aplicación */
export const $User$ = (model("user",(new Schema({
    /** Identificador Único del Usuario en la Base de Datos */
    _id: {
        required: false,
        type: Schema["Types"]["ObjectId"],
        auto: true
    },
    /** Nombre del Usuario con el Primer Nombre y Apellido del Usuario */
    name: {
        required: false,
        type: String,
        unique: false,
        min: 6,
        max: 64,
        default: "Usuario Predeterminado",
        validate: {
            validator: ($value$:string) => /^([A-Z]{1}[a-z ]+){1,2}$/["test"]($value$),
            message: "El nombre completo del usuario no cumple con el formato establecido"
        }
    },
    /** Nombre de Apodo del Usuario */
    nick: {
        required: [true,"Se requiere de un nombre identificable para el usuario"],
        type: String,
        trim: true,
        unique: true,
        min: 4,
        max: 16,
        validate: {
            validator: ($value$:string) => /^[A-Za-z0-9]+$/["test"]($value$),
            message: "El nombre del apodo dado no cumple con el formato establecido"
        }
    },
    /** Correo Electrónico del Usuario */
    mail: {
        required: [true,"Se requiere de un correo electrónico para el usuario"],
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        min: 6,
        max: 64,
        validate: {
            validator: ($value$:string) => /^[a-z0-9A-Z\-\_]+\@[a-z]\.([a-z]){2,3}(\.([a-z]){2,3})?$/["test"]($value$),
            message: "El correo electrónico dado no cumple con el formato establecido"
        }
    },
    /** Contraseña Definida por el Usuario */
    password: {
        required: [true,"Se requiere de una contraseña para el usuario encriptado"],
        type: String,
        trim: true,
        unique: true,
        min: 8,
        max: 256,
        validate: {
            validator: ($value$:string) => /^[A-Za-z0-9\\\/\$\.]+$/["test"]($value$),
            message: "El formato de la contraseña con la definición encriptada no es valída"
        }
    }
},{collection:$prefix$("user"),timestamps:true}))));