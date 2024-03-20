/*
@author LxingA
@project CodeInk
@name API
@description Definición de las Esquemas Generales para la Aplicación "InkExpress" en la Base de Datos del Proyecto
@date 10/03/2024 12:30AM
*/
import {Schema,model} from 'mongoose';
import {$Language$} from '../../util/object';
import type {Language} from '../../type/database';
const $prefix$ = ($:string) => `_inkexpress_${$}`;

/** Definición de la Esquema para las Categorías de los Productos de la Aplicación */
export const $Category$ = model("category",(new Schema({
    /** Identificador Único de la Categoría */
    _id: {
        required: false,
        type: Schema["Types"]["ObjectId"],
        auto: true
    },
    /** Definición del Titulo de la Categoría */
    title: {
        required: [true,"Se requiere de un nombre para la categoría"],
        type: Object,
        validate: {
            validator: ($value$:Language) => $Language$($value$,{
                $max$: 64,
                $min$: 4,
                $regex$: /\s/g,
                $trim$: false
            }),
            message: "El titulo lado no cumple con el formato establecido para la categoría"
        }
    },
    /** Definición de los Subtitulos a Mostrar como Subcategorías para la Categoría */
    subtitle: {
        required: false,
        type: Array,
        validate: {
            validator: ($value$:[]) => ($value$ instanceof Array),
            message: "El contenedor para los subtitulos para la categoría no cumple con el formato establecido para la categoría"
        }
    },
    /** Definición de los Productos a Mostrar en la Categoría */
    product: {
        required: [true,"Se requiere de productos para la categoría"],
        type: Array,
        validate: {
            validator: ($value$:[]) => ($value$ instanceof Array),
            message: "El contenedor para los productos de la categoría no cumple con el formato establecido"
        }
    },
    /** Definición de un Mensaje en el Contenedor de la Categoría */
    message: {
        required: false,
        type: Object,
        validate: {
            validator: ($value$:Language) => $Language$($value$,{
                $max$: 250,
                $min$: 8,
                $regex$: /\s/g,
                $trim$: false
            }),
            message: "El mensaje a mostrar en el contenedor de la categoría, no cumple con el formato establecido"
        }
    },
    /** Definición de un Nombre de Imagén para Establecer en la Categoría */
    image: {
        required: false,
        type: String,
        trim: true,
        unique: false,
        lowercase: true,
        min: 4,
        max: 32,
        validate: {
            validator: ($value$:string) => /^[a-z0-9\_]+$/["test"]($value$),
            message: "El nombre de la imagén para mostrar en el contenedor de la categoría no cumple con el formato establecido"
        }
    }
},{collection:$prefix$("category"),timestamps:true})));