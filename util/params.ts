/*
@author LxingA
@project CodeInk
@name API
@description Definición de la Funcionalidad para la Obtención de los Parámetros Esenciales del Proyecto
@date 09/03/2024 11:30PM
*/
import $Firebase$ from "../bin/firebase";
import type Parameters from "../type/parameter";

/** Función Esencial para la Obtención de los Parámetros Esenciales de la API */
const $Parameters$ = async(): Promise<Parameters> => {
    const $__request__$ = (await $Firebase$["getTemplate"]())["parameters"];
    let $__container__$ = {};
    (Object["keys"]($__request__$))["forEach"](($,$$) => {
        const $__value__$ = ((Object["values"]($__request__$))[$$]["defaultValue"] as any)["value"];
        $__container__$[$] = ($__value__$["startsWith"]("{")) ? JSON["parse"]($__value__$) : $__value__$;
    });return ($__container__$ as Parameters);
};

export default $Parameters$;