/*
@author LxingA
@project CodeInk
@name API
@description Definición del Rutador con el Contexto de la Aplicación "Shortener" para la API
@date 17/03/2024 04:30AM
*/
import {Router} from 'express';
import {$Cache$} from '../../../util/async';
import {$Context$} from '../../../util/object';
import {$Link$} from '../../../database/service/shortener';
import type {Request,Response} from 'express';
import type {Link} from '../../../type/service/shortener';
import type {APIResponse} from '../../../type/parameter';
import $Parameters$ from '../../../util/params';
import $Logger$ from '../../../util/logger';

const $Shortener$ = Router()

/** Definición del Contexto GET para la Obtención de Información de la Aplicación */
$Shortener$["get"]("/",$Cache$("1 hour"),async($rq:Request,$rs:Response) => {
    const $__logger__$ = {$context$:"shortener_context_get",$country$:$rq["clientIp"]};
    $Logger$({...$__logger__$,$message$:"Inicializando la consulta de la obtención de una información en ámbito de la aplicación shortener...",$type$:"info"});
    const $__headers__$ = (await $Parameters$())["CkGlobParamAPI"]["HTTPHeader"];
    const $__language__$ = (($rq["header"]($__headers__$[1])) ?? "es");
    if((await $Context$["$__initial__$"]({$request$:$rq,$response$:$rs,$addon$:$__logger__$}))) switch($rq["query"]["context"]){
        /** Obtención de Información de un Enlace Acortado */
        case "link":
            $Logger$({...$__logger__$,$type$:"info",$message$:"Inicializando la definición del objeto para la obtención de los enlaces acortados ["+$rq["query"]["key"] ?? "no definido"+"]"});
            const $__request__$: Link[] = (await $Link$["find"]({name:$rq["query"]["key"],active:true})["exec"]())["map"]($=>{let $$=$["_doc"];$$["description"]=$$["description"][$__language__$];return $$});
            let $__default__$ = {$tt$:(Date["now"]())};
            if($__request__$["length"] == 0){
                $Logger$({...$__logger__$,$type$:"warn",$message$:"No se encontró ningún enlace acortado en la base de datos con los parámetros solicitados..."});
                $__default__$["$rs$"] = null;
                $__default__$["$st$"] = false;
            }else{
                $Logger$({...$__logger__$,$type$:"success",$message$:"Se encontró un total de " + $__request__$["length"] + " enlaces acortados en la base de datos..."});
                $__default__$["$rs$"] = $__request__$;
                $__default__$["$st$"] = true;
            }$rs["status"](200)["jsonp"]($__default__$ as APIResponse);
        break;
        default:
            (await $Context$["$__404__$"]({$request$:$rq,$response$:$rs,$addon$:$__logger__$}));
        break;
    }
});

/** Definición del Contexto PUT para la Mutación de Información de la Aplicación */
$Shortener$["put"]("/",async($rq:Request,$rs:Response) => {
    const $__logger__$ = {$context$:"shortener_context_put",$country$:$rq["clientIp"]};
    $Logger$({...$__logger__$,$message$:"Inicializando la consulta del mutador de la información en ámbito de la aplicación shortener...",$type$:"info"});
    if(await ($Context$["$__initial__$"]({$request$:$rq,$response$:$rs,$addon$:$__logger__$}))) switch($rq["body"]["context"]){
        /** Mutación de Información de un Enlace Acortado */
        case "link":
            $Logger$({...$__logger__$,$message$:"Inicializando la mutación de un enlace acortado con identificador \""+$rq["body"]["key"]+"\" para la acción \""+$rq["body"]["action"]+"\" solicitada...",$type$:"info"});
            let $__default__$ = {$tt$:(Date["now"]())};
            try{
                (await $Link$["findOneAndUpdate"]({name:$rq["body"]["key"],active:true},{view:(Number($rq["body"]["current_value"]) + 1)}));
                $Logger$({...$__logger__$,$message$:"Se ejecutó con éxito la acción \""+$rq["body"]["action"]+"\" del enlace acortado \""+$rq["body"]["key"]+"\"...",$type$:"success"});
                $__default__$["$rs$"] = null;
                $__default__$["$st$"] = true;
                $__default__$["$ms$"] = "Se actualizó con éxito el enlace acortado solicitado";
            }catch($error){
                $Logger$({...$__logger__$,$message$:"Hubo un error a actualizar el enlace acortado \""+$rq["body"]["key"]+"\" para la acción \""+$rq["body"]["action"]+"\" solicitada con el siguiente mensaje \""+$error+"\"",$type$:"warn"});
                $__default__$["$rs$"] = null;
                $__default__$["$st$"] = false;
                $__default__$["$ms$"] = "Hubo un error a actualizar el enlace acortado solicitado con el siguiente mensaje \""+$error+"\"";
            }$rs["status"](200)["jsonp"]($__default__$ as APIResponse);
        break;
        default:
            (await $Context$["$__404__$"]({$request$:$rq,$response$:$rs,$addon$:$__logger__$}));
        break;
    }
});

/** Definición del Contexto POST para la Añadición/Comprobación de Información de la Aplicación */
$Shortener$["post"]("/",async($rq:Request,$rs:Response) => {
    const $__logger__$ = {$context$:"shortener_context_post",$country$:$rq["clientIp"]};
    $Logger$({...$__logger__$,$message$:"Inicializando la consulta del obtenedor de información en ámbito de la aplicación shortener...",$type$:"info"});
    if(await ($Context$["$__initial__$"]({$addon$:$__logger__$,$request$:$rq,$response$:$rs}))) switch($rq["body"]["context"]){
        /** Verificar la Existencia del Usuario y su Contraseña para el Acceso al Panel de Control */
        case "check_exists_user":
            let $__response__$ = {$tt$:(Date["now"]())};
            if("username" in $rq["body"] && "password" in $rq["body"]){
                $Logger$({...$__logger__$,$message$:"Inicializando la comprobación de las credenciales de acceso...",$type$:"ok"});
                
            }else{
                $Logger$({...$__logger__$,$message$:"No se encontró las credenciales de acceso al panel de control en el cuerpo de la solicitud",$type$:"warn"});
                $__response__$["$rs$"] = null;
                $__response__$["$st$"] = false;
                $__response__$["$ms$"] = "No se envío en el cuerpo de la solicitud las credenciales de acceso";
                $rs["status"](500)["json"]($__response__$ as APIResponse);
            }
        break;
        default:
            (await $Context$["$__404__$"]({$addon$:$__logger__$,$request$:$rq,$response$:$rs}));
        break;
    }
});

export default $Shortener$;