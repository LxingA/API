/*
@author LxingA
@project CodeInk
@name API
@description Definición del Interfaz para el Objeto con la Información de los Dominios del Proyecto
@date 17/02/2024 08:30PM
*/
import {Schema,model} from 'mongoose';
import {$Language$} from '../util/object';
import type {Language} from '../type/database';
import type Prototype from '../type/domain';

/** Definición de la Esquema para los Dominios Públicos del Proyecto */
const Domain = (new Schema({
    /** Identificador Único del Dominio Público en Formato UUID */
    _id: {
        required: false,
        type: Schema["Types"]["ObjectId"],
        auto: true
    },
    /** Nombre Identificable Corta del Dominio Público */
    name: {
        required: [true,"Se requiere de un nombre identificable para el dominio"],
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        min: 3,
        max: 16,
        validate: {
            validator: ($value:string) => /^[a-z]+$/["test"]($value),
            message: "El nombre identificable para el dominio público no es valido"
        }
    },
    /** Indicar sí el Dominio Público está Activo */
    active: {
        required: false,
        type: Boolean,
        default: false,
        validate: {
            validator: ($value:boolean) => (typeof($value) == "boolean"),
            message: "El tipo de dato para establecer la activación del dominio público no es valido"
        }
    },
    /** Dominio en Formato FQDN para la Definición del Dominio Público */
    fqdn: {
        required: [true,"Se requiere de un dominio en formato FQDN para el dominio"],
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        min: 8,
        max: 64,
        validate: {
            validator: ($value:string) => /^([a-z]+)\.([a-z]){2,3}(\.([a-z]){2,3})?$/["test"]($value),
            message: "El formato FQDN para el dominio público no es valido"
        }
    },
    /** Descripción Acerca del Propósito del Dominio Público */
    description: {
        required: false,
        type: Object,
        default: {
            es: "No se ha definido aún una descripción acerca del dominio público"
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
    },
    /** Fecha de Registro del Dominio Público a la ICANN */
    registrar: {
        required: [true,"Se requiere de una fecha de registro del dominio en el ICANN"],
        type: Date,
        validate: {
            validator: ($value:Date) => ($value instanceof Date),
            message: "La fecha de registro dada no es un formato valido de fecha"
        }
    }
},{timestamps:true,collection:"domain"}));

/** Definición del Modelo de los Dominios Públicos en Base de una Esquema Definida */
export default model<Prototype>("Dominios",Domain);