/*
@author LxingA
@project CodeInk
@name API
@description Definición del Interfaz para el Objeto con la Información de los Proyectos del Proyecto
@date 19/02/2024 10:30PM
*/
import {Schema,model} from 'mongoose';
import {$Language$} from '../util/object';
import type {Language} from '../type/database';
import Prototype from '../type/project';

/** Definición de la Esquema para los Proyectos del Proyecto */
const Project = (new Schema({
    /** Identificador Único del Punto Final en Formato UUID */
    _id: {
        required: false,
        type: Schema["Types"]["ObjectId"],
        auto: true
    },
    /** Nombre del Proyecto */
    name: {
        required: [true,"Se requiere de un nombre para el proyecto"],
        type: String,
        trim: true,
        unique: true,
        min: 3,
        max: 16,
        validate: {
            validator: ($value:string) => /^[a-zA-Z]+$/["test"]($value),
            message: "El nombre del proyecto proporcionada no es valida"
        }
    },
    /** Indicar sí el Proyecto está Habilitado en el Proyecto */
    active: {
        required: false,
        type: Boolean,
        default: false,
        validate: {
            validator: ($value:boolean) => (typeof($value) == "boolean"),
            message: "El tipo de dato para establecer la activación del proyecto no es valido"
        }
    },
    /** Contenedor con los Nombres Alternativos del Proyecto */
    alternative: {
        required: false,
        type: Array,
        default: [],
        validate: {
            validator: ($value:string[]) => {
                $value = $value["filter"]($name => !(/^[a-zA-Z ]+$/["test"]($name)));
                return ($value["length"] == 0);
            },
            message: "El contenedor con los nombres alternativos para el proyecto no es valido"
        }
    },
    /** Número de Telefóno Asociada al Proyecto en Formato Mexicano */
    telephone: {
        required: false,
        type: String,
        default: "+528100000000",
        min: 12,
        max: 16,
        validate: {
            validator: ($value:string) => /^(\+5281(([0-9]){8}))$/["test"]($value),
            message: "El telefóno dado no tiene un formato valido"
        }
    },
    /** Identificador Único del Dominio Público Asociado al Proyecto */
    domain: {
        required: [true,"Se requiere de una referencia de un dominio público para el proyecto"],
        type: Schema["Types"]["ObjectId"]
    },
    /** Descripción Acerca del Propósito del Proyecto en el Proyecto */
    description: {
        required: false,
        type: Object,
        default: {
            es: "No se ha definido aún una descripción acerca del proyecto"
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
    /** Correo Electrónico de Contacto para el Proyecto */
    mail: {
        required: [true,"Se requiere de un correo electrónico de contacto para el proyecto"],
        type: String,
        lowercase: true,
        trim: true,
        min: 6,
        max: 64,
        validate: {
            validator: ($value:string) => /^([a-z]+)\@([a-z]+)\.([a-z]){2,3}(\.([a-z]){2,3})?$/["test"]($value),
            message: "El correo electrónico dado no tiene un formato valido"
        }
    },
    /** Objeto con la Localidad del Proyecto en la Geolocalización */
    location: {
        required: false,
        type: Object,
        default: {}
    },
    /** Contenedor con las Redes Sociales del Proyecto */
    social: {
        required: false,
        type: Array,
        default: []
    }
},{timestamps:true,collection:"project"}));

/** Definición del Modelo de los Proyectos en Base de una Esquema Definida */
export default model<Prototype>("projects",Project);