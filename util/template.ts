/*
@author LxingA
@project CodeInk
@name API
@description Implementación del Objeto para las Plantillas de la API
@date 18/02/2024 04:00PM
*/
import 'dotenv/config';
import $Application$ from '../database/application';
import $Domain$ from './domain';
import $Cache$ from '../bin/cache';
import $Logger$ from './logger';
import $Project$ from '../database/project';
import type Template from '../type/template';

/** Definición del Objeto con la Información Esencial de las Plantillas de la API */
const $Template$ = async({__context__ = "template_object",__default__,__cache__ = true}:{__context__?:string,__default__?:{title?:string,subtitle?:string},__cache__?:boolean}): Promise<Template | undefined> => {
    $Logger$({$message$:"Se inicializa la definición del objeto con la información para la plantilla...",$context$:__context__,$type$:"info"});
    if($Cache$["has"](__context__)){
        $Logger$({$message$:"Se encontró en cache el objeto con la información de las plantillas... Se procede a retornarla con ID \""+__context__+"\""});
        return (JSON["parse"]($Cache$["get"](__context__) ?? "\{\}") as Template);
    }else try{
        $Logger$({$message$:"No se encontró en cache el objeto con la información de las plantillas... Se procede a instanciarla con ID \""+__context__+"\"",$context$:__context__,$type$:"info"});
        const $object$ = (await $Application$["exists"]({key:process["env"]["CkAPIEnvironmentApplicationKey"]}));
        if($object$){
            const $information$ = (await $Application$["findById"]($object$));
            const $project$ = (await $Project$["findById"]($information$?.project));
            const $endpoint$ = (await $Domain$({$subdomain$:"global"})) ?? "http://unknown.random";
            const $defined_objected$ = {
                $uri$: $endpoint$,
                $version$: $information$?.version ?? "1.0.0",
                $author$: $project$?.name ?? "LxingA",
                $slogan$: $information$?.slogan["es"] ?? "No hay Información",
                $name$: $information$?.title ?? "Aplicación",
                $email$: $project$?.mail ?? "unknown@example.com",
                $title$: __default__?.title ?? $project$?.name! + " " + $information$?.title!,
                $description$: __default__?.subtitle ?? $information$?.slogan!
            };
            __cache__ && $Cache$["set"](__context__,JSON["stringify"]($defined_objected$));
            return $defined_objected$;
        }else $Logger$({$message$:"No se pudo un obtener la información esencial de las plantillas desde la base de datos",$context$:__context__,$type$:"info"});
    }catch($){
        $Logger$({$message$:"Hubo un error a definir el objeto con la información esencial para las plantillas con el siguiente mensaje \""+$+"\"",$context$:__context__,$type$:"critic"});
    }
};

export default $Template$;