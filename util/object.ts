/*
@author LxingA
@project CodeInk
@name API
@description Definición de los Objetos Globales para la API
@date 02/03/2024 12:30AM
*/
import type {Schema} from 'mongoose';
import $Applicaton_Engine$ from '../database/application';
import type $Applicaton_Prototype$ from '../type/application';
import $Domain_Engine$ from "../database/domain";
import type $Domain_Prototype$ from '../type/domain';
import $EndPoint_Engine$ from '../database/endpoint';
import type $EndPoint_Prototype$ from '../type/endpoint';
import $Project_Engine$ from '../database/project';
import type $Project_Prototype$ from '../type/project';
import $Logger$ from './logger';
import $Template$ from './template';
import type {Language} from '../type/database';
import type {Request,Response} from 'express';

/** Definición de los Tipos como Nombres de la Base de Datos */
type $database_type$ = "domain" | "application" | "endpoint" | "project";

/** Definición de los Parámetros Esenciales para el Contenedor de la Base de Datos */
interface $__parameters__$ {
    /** Identificador Único del Elemento en la Base de Datos */
    $_id$?: string | Schema.Types.ObjectId,
    /** Contenedor con los Parámetros Adicionales en la Consulta a la Base de Datos */
    $_query$?: Record<string,any>
};

/** Definición de los Parámetros Esenciales para el Handler del Objeto */
interface $__handler__$ extends $__parameters__$ {
    /** Nombre de un Identificador para el Logger */
    $_identified$: string,
    /** Nombre de la Base de Datos para el Contexto del Handler */
    $_database$: $database_type$,
    /** Función de Referencia para la Manipulación del Arreglo para el Elemento Solicitado */
    $_callback$?: ($container$:any[],$object$:any) => Promise<void>,
    /** Indicar sí no se requiere de una Manipulación en el Objeto para Definir el Elemento Solicitado */
    $_inmutable$: boolean
};

/** Definición del Contenedor con Todos los Objetos Definidos para la API */
const $Object$ = {
    /** Funcionalidad Útil para la Obtención del Elemento Solicitado en Contenedor o un Sólo Elemento */
    $container$: async({$key$,$type$,$search$}:{
        /** Identificador Único del Elemento de la Base de Datos */
        $key$?: string | Schema.Types.ObjectId,
        /** Definición del Contexto a Establecer en la Base de Datos */
        $type$: $database_type$,
        /** Contenedor con los Parámetros Adicionales en la Consulta a la Base de Datos */
        $search$?: Record<string,any>
    }): Promise<[] | {} | string> => {
        $Logger$({$message$:`Inicializando la obtención de la información a la base de datos con la siguiente información: [${$key$ ?? "Sin ID"},${$type$},${$search$ ? JSON["stringify"]($search$) : "{}"}]`,$context$:"object_definition_container",$type$:"info"});
        try{
            let $request$: any;
            switch($type$){
                case "application":
                    $request$ = $Applicaton_Engine$;
                break;
                case "domain":
                    $request$ = $Domain_Engine$;
                break;
                case "endpoint":
                    $request$ = $EndPoint_Engine$;
                break;
                case "project":
                    $request$ = $Project_Engine$;
                break;
            };const $query$ = (await $request$["find"](($key$ ? {_id:$key$} : ($search$ ? $search$ : {})))["exec"]());
            const $container$: any[] = [];
            $query$["forEach"](($:{}) => $container$["push"]($));
            $Logger$({$message$:"Se retornó con éxito la información solicitada...",$context$:"object_definition_container",$type$:"ok"});
            return $key$ ? $container$[0] : $container$;
        }catch($){
            $Logger$({$message$:"Hubo un error a obtener la información de la base de datos solicitada con el siguiente mensaje \""+$+"\"",$context$:"object_definition_container",$type$:"critic"});
            return $ as string;
        }
    },
    /** Definción del Callback para Reutilizar en los Contextos del Objeto */
    $handler$: async({$_id$,$_query$,$_identified$,$_database$,$_callback$,$_inmutable$}:$__handler__$): Promise<any> => {
        $Logger$({$type$:"info",$context$:$_identified$,$message$:`Inicializando la definición del objeto con la información del actual contexto con la siguiente petición: [${$_id$ ?? "sin identificador"}:${$_query$ ? JSON["stringify"]($_query$) : "{}"}]`});
        let $0$ = (await $Object$["$container$"]({$type$:$_database$,$key$:$_id$,$search$:$_query$})), $1$: any[] = [];
        if(typeof $0$ == "string") return [];
        else if($_inmutable$) return $0$;
        else switch($0$ instanceof Array){
            case true:
                (await Promise["all"](
                    ($0$ as any[])["map"](async $ => {
                        let $$ = $["_doc"];
                        (await $_callback$!($1$,$$));
                    })
                ));
                return $1$;
            case false:
                (await $_callback$!($1$,$0$));
                return $1$[0];
        }
    },
    /** Contenedor con Todos los Objetos de la Base de Datos */
    $database$: {
        /** Obtención del Contenedor o Objeto con la Información de un Dominio Público */
        $domain$: async({$_id$,$_query$}:$__parameters__$): Promise<$Domain_Prototype$ | $Domain_Prototype$[]> => (await $Object$["$handler$"]({
            $_id$,
            $_query$,
            $_inmutable$: true,
            $_identified$: "object_definition_database_domain",
            $_database$: "domain"
        })),
        /** Obtención del Contenedor o Objeto con la Información de un Punto Final */
        $endpoint$: async({$_id$,$_query$}:$__parameters__$): Promise<$EndPoint_Prototype$ | $EndPoint_Prototype$[]> => (await $Object$["$handler$"]({
            $_id$,
            $_query$,
            $_inmutable$: false,
            $_identified$: "object_definition_database_endpoint",
            $_database$: "endpoint",
            $_callback$: async($,$$) => {
                $$["domain"] = (await $Object$["$database$"]["$domain$"]({$_id$:($$["domain"] as Schema.Types.ObjectId)})) as $Domain_Prototype$;
                $["push"]($$);
            }
        })),
        /** Obtención del Contenedor o Objeto con la Información de un Proyecto */
        $project$: async({$_id$,$_query$}:$__parameters__$): Promise<$Project_Prototype$ | $Project_Prototype$[]> => (await $Object$["$handler$"]({
            $_id$,
            $_query$,
            $_inmutable$: false,
            $_identified$: "object_definition_database_project",
            $_database$: "project",
            $_callback$: async($,$$) => {
                $$["domain"] = (await $Object$["$database$"]["$domain$"]({$_id$:$$["domain"] as Schema.Types.ObjectId})) as $Domain_Prototype$;
                $["push"]($$);
            }
        })),
        /** Obtención del Contenedor o Objeto con la Información de una Aplicación */
        $application$: async({$_id$,$_query$}:$__parameters__$): Promise<$Applicaton_Prototype$ | $Applicaton_Prototype$[]> => (await $Object$["$handler$"]({
            $_id$,
            $_query$,
            $_inmutable$: false,
            $_identified$: "object_definition_database_application",
            $_database$: "application",
            $_callback$: async($,$$) => {
                $$["project"] = (await $Object$["$database$"]["$project$"]({$_id$:$$["project"] as Schema.Types.ObjectId})) as $Project_Prototype$;
                $["push"]($$);
            }
        }))
    }
};

/** Handler para la Verificación de un Objeto con los Idiomas de la Base de Datos */
export const $Language$ = ($value$:Language,$option$:{
    /** Verificar sí el Valor tiene Espacios */
    $trim$: boolean,
    /** Definir una Regla de Expresión Regular para el Valor */
    $regex$: RegExp,
    /** Establecer un Mínimo de Anchura del Valor */
    $min$: number,
    /** Establecer un Máximo de Anchura del Valor */
    $max$: number
}): boolean => {
    const $container$: string[] = [];
    Object["values"]($value$)["forEach"]($ => {
        if($option$["$trim$"] && (/\S/g)["test"]($)) $container$["push"]($);
        else if($["length"] > $option$["$max$"]) $container$["push"]($);
        else if($["length"] < $option$["$min$"]) $container$["push"]($);
        else if(!($option$["$regex$"]["test"]($))) $container$["push"]($);
    });return ($container$["length"] == 0);
};

/** Definición de los Parámetros del Objeto Contexto */
type ContextParameters = {
    /** Referencia al Objeto de Solicitud de la API */
    $request$: Request,
    /** Referencia al Objeto de Respuesta de la API */
    $response$: Response,
    /** Contenedor con Información Adicional para el Objeto de Logger */
    $addon$: any
};

/** Handlers para la Verificación de los Contextos de los Rutadores de la API */
export const $Context$ = {
    /** Inicializar la Comprobación sí Existe el Contexto en la Solicitud HTTP */
    $__initial__$: async({$request$,$response$,$addon$}:ContextParameters): Promise<boolean> => {
        $Logger$({...$addon$,$type$:"info",$message$:"Inicializando la verificación de la propiedad contexto en la solicitud..."});
        if(("context" in $request$["query"]) || ("context" in $request$["body"])){
            $Logger$({...$addon$,$type$:"success",$message$:"Se encontró el contexto en la solicitud, se procede a definir las variantes..."});
            return true;
        }else{
            $Logger$({...$addon$,$type$:"warn",$message$:"No se encontró en la solicitud la propiedad context para la inicialización de la solicitud..."});
            $response$["status"](404)["render"]("default.pug",(await $Template$({
                __default__: {
                    title: "Contexto no Definido",
                    subtitle: "Lo sentimos, no haz especificado un contexto a obtener en la API"
                },__cache__: false
            })));return false;
        }
    },
    $__404__$: async({$request$,$response$,$addon$}:ContextParameters) => {
        $Logger$({...$addon$,$type$:"warn",$message$:"Hubo un error a obtener el contexto debido que \""+$request$["query"]["context"]+"\" no existe en la definición..."});
        $response$["status"](404)["render"]("default.pug",(await $Template$({
            __default__: {
                title: "Contexto no Encontrado",
                subtitle: "Lo sentimos, el contexto \""+ $request$["query"]["context"] +"\" especificado no existe en nuestra definición"
            },__cache__: false
        })));
    }
};

export default $Object$;