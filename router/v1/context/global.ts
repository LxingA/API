/*
@author LxingA
@project CodeInk
@name API
@description Definición del Rutador con el Contexto Global para la API
@date 02/03/2024 12:10AM
*/
import {Router as $Router$} from 'express';
import $Template$ from '../../../util/template';
import $Parameters$ from '../../../util/params';
import type $Application_Prototype$ from '../../../type/application';
import type $EndPoint_Prototype$ from '../../../type/endpoint';
import type $Project_Prototype$ from '../../../type/project';
import type {Request,Response} from 'express';
import type {Service} from '../../../type/router/global.context';
import $Domain$ from '../../../util/domain';
import $Logger$ from '../../../util/logger';
import $local$,{$Context$} from '../../../util/object';

/** Definición del Rutador para el Contexto Global de la API */
const $Global$ = $Router$();

/** Definición del Tipo GET para la Obtención de Información General de la API */
$Global$["get"]("/",async($rq:Request,$rs:Response) => {
    const $__logger__$ = {$context$:"global_context_get",$country$:$rq["clientIp"]};
    $Logger$({...$__logger__$,$message$:"Inicializando la consulta de la obtención de una información en ámbito global...",$type$:"info"});
    const $__params__$ = (await $Parameters$());
    const $__headers__$ = $__params__$["CkGlobParamAPI"]["HTTPHeader"];
    const $__language__$ = (($rq["header"]($__headers__$[1])) ?? "es");
    if((await $Context$["$__initial__$"]({$request$:$rq,$response$:$rs,$addon$:$__logger__$}))) switch($rq["query"]["context"]){
        /** Definición del Objeto con la Información de un Servicio */
        case "service":
            $Logger$({...$__logger__$,$message$:"Inicializando la definición del objeto del servicio solicitado...",$type$:"info"});
            if($__headers__$["length"] == 0){
                $Logger$({...$__logger__$,$message$:"No se encontró en la cabecera HTTP Esencial el Identificador del Servicio por lo que no se puede retornar la información solicitada...",$type$:"warn"});
                $rs["status"](500)["render"]("default.pug",(await $Template$({
                    __default__: {
                        title: "Identificador no Encontrado",
                        subtitle: "Lo sentimos, el identificador del servicio de la cuál está solicitando información no se ha encontrado"
                    },
                    __cache__: false
                })));
            }else{
                const $__application__$ = ((await $local$["$database$"]["$application$"]({$_query$:{key:$rq["header"]($__headers__$[0])}})) as $Application_Prototype$[])[0];
                let $__endpoint__$: Record<string,string> = {};
                (await Promise["all"](
                    ((await $local$["$database$"]["$endpoint$"]({$_query$:{active:true}})) as $EndPoint_Prototype$[])["map"](async ({name}) => {
                        const $$ = (await $Domain$({$subdomain$:name}));
                        if(typeof($$) == "string") $__endpoint__$[name] = $$;
                    })
                ));
                const $__project__$ = $__application__$["project"] as $Project_Prototype$;
                const $__analytic_identified__$ = $__application__$["analytic"]["split"](":");
                $__endpoint__$["asset"] = (await $Domain$({$name$:"index",$ext:$__application__$["name"]})) as string;
                $rs["status"](200)["json"]({
                    name: $__application__$["title"],
                    slogan: $__application__$["slogan"]![($__language__$ as string)],
                    description: $__application__$["description"]![($__language__$ as string)],
                    endpoint: $__endpoint__$,
                    version: $__application__$["version"],
                    identified: $__application__$["name"],
                    project: {
                        name: $__project__$["name"],
                        alternative: $__project__$["alternative"],
                        telephone: $__project__$["telephone"],
                        description: $__project__$["description"],
                        mail: $__project__$["mail"],
                        location: $__project__$["location"],
                        social: $__project__$["social"]
                    },
                    analytic: {
                        endpoint: "https://www.googletagmanager.com/gtag/js?id=k",
                        identified: $__analytic_identified__$[1],
                        key: $__analytic_identified__$[0]
                    },
                    option: $__params__$["CkGlobParamAPP"],
                    general: $__application__$["global"],
                    keywords: $__application__$["keywords"],
                    localStyle: $__application__$["localStyle"]
                } as Service);
            }
        break;
        default:
            (await $Context$["$__404__$"]({$request$:$rq,$response$:$rs,$addon$:$__logger__$}));
        break;
    }
});

export default $Global$;