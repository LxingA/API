/*
@author LxingA
@project CodeInk
@name API
@description Definición de los Middleware para la API
@date 22/02/2024 06:00PM
*/
import type {Request,Response,NextFunction} from 'express';
import $Application$ from '../database/application';
import $Logger$ from '../util/logger';
import $Template$ from '../util/template';
import $Parameters$ from '../util/params';
const $__texted__$ = "Inicializando la ejecución del middleware \"$context$\" para la verificación de las cabeceras...";

/** Middleware para la Verificación de Integridad de las Cabeceras de la API */
export const $Header$ = async($rq:Request,$rs:Response,$nt:NextFunction): Promise<void> => {
    const $initial$ = {$context$:"middleware",$country$:$rq["clientIp"]};
    $Logger$({...$initial$,$message$:$__texted__$["replace"]("$context$","Header"),$type$:"info"});
    const $headers$: string[] = (await $Parameters$())["CkGlobParamAPI"]["HTTPHeader"];
    if(typeof($rq["header"]($headers$[0])) == "undefined"){
        $Logger$({...$initial$,$message$:"No se encontró la cabecera HTTP \""+$headers$[0]+"\" esencial para la inicialización de la API. Se procede a detener la ejecución...",$type$:"critic"});
        $rs["status"](400)["render"]("default.pug",(await $Template$({__default__:{title:"Cabecera no Definida",subtitle:"La cabecera HTTP esencial para el acceso a la API no está definida"}})));
        $nt();
    }else{
        $Logger$({...$initial$,$message$:"Se encontraron las siguientes cabeceras HTTP \""+$headers$+"\". Se procede a verificar la clave de acceso...",$type$:"ok"});
        const $key$ = $rq["header"]($headers$[0])!;
        if(!(/^([0-9a-z]){8}\-(([0-9a-z]+)\-?){3}([a-z0-9]){12}$/["test"]($key$))){
            $Logger$({...$initial$,$message$:"La clave de aplicación de acceso dado \""+$key$+"\" no tiene un formato valido. Se procede a omitir la inicialización de la API...",$type$:"critic"});
            $rs["status"](400)["render"]("default.pug",(await $Template$({__default__:{title:"Clave no Valida",subtitle:"La clave de aplicación de acceso a la API no es valida"}})));
            $nt();
        }else{
            $Logger$({...$initial$,$message$:"La clave de aplicación de acceso dado \""+$key$+"\" tiene un formato valido. Se procede a verificar la existencia en la base de datos...",$type$:"ok"});
            const $found$ = (await $Application$["exists"]({key:$key$}));
            if(!$found$){
                $Logger$({...$initial$,$message$:"La clave de aplicación de acceso dado \""+$key$+"\" no existe en la base de datos. Se procede a omitir la inicialización de la API...",$type$:"critic"});
                $rs["status"](401)["render"]("default.pug",(await $Template$({__default__:{title:"Aplicación no Existente",subtitle:"La clave de aplicación de acceso no existe en la base de datos"}})));
                $nt();
            }else{
                $Logger$({...$initial$,$message$:"La clave de aplicación de acceso a la API \""+$key$+"\" es valída y se encuentra registrada en la base de datos. Se procede con el acceso a la API...",$type$:"success"});
                $nt();
            }
        }
    }
};

/** Middleware de Seguridad para la Verificación de los Accesos a la API */
export const $Security$ = async($rq:Request,$rs:Response,$nt:NextFunction): Promise<void> => {
    const $initial$ = {$context$:"middleware",$country$:$rq["clientIp"]};
    $Logger$({...$initial$,$message$:$__texted__$["replace"]("$context$","Security"),$type$:"info"});
    const $__parameters__$ = (await $Parameters$())["CkGlobParamAPI"];
    const $methods$: string[] = $__parameters__$["HTTPMethod"];
    if(!$methods$["includes"]($rq["method"])){
        $Logger$({...$initial$,$message$:"El método HTTP \""+$rq["method"]+"\" no está permitida en la API. Se procede a omitir la inicialización...",$type$:"critic"});
        $rs["status"](405)["render"]("default.pug",(await $Template$({__default__:{title:"Método HTTP no Permitida",subtitle:"La cabecera HTTP \""+$rq["method"]+"\" no está permitida en la API"}})));
        $nt();
    }else{
        let $origin$: string[] = [];
        $Logger$({...$initial$,$message$:"El método HTTP \""+$rq["method"]+"\" está permitida en la lista \""+$methods$+"\". Se procede a verificar los origenes HTTP y las direcciones IP para el acceso a la API...",$type$:"ok"});
        if(typeof($rq["header"]("Origin")) == "undefined" || typeof($rq["header"]("Referer")) == "undefined"){
            if(typeof $rq["header"]($__parameters__$["HTTPHeader"][2]) != "undefined"){
                $Logger$({...$initial$,$message$:"Se detectó la cabecera con la clave de acceso de forma exclusiva a la API...",$type$:"info"});
                if($__parameters__$["SecretAccessByNativeApps"] != $rq["header"]($__parameters__$["HTTPHeader"][2])){
                    $Logger$({...$initial$,$message$:"La clave de acceso especial a la API no coincide con la registrada en la Base de Datos. Se procede a bloquear el acceso...",$type$:"warn"});
                    $rs["status"](400)["render"]("default.pug",(await $Template$({__default__:{title:"Clave de Acceso Inválido",subtitle:"No tienes autorización a la API debido a la clave de acceso inválida"},__cache__:true})));
                }else $nt();
            }else{
                $origin$ = $__parameters__$["SecureOriginIP"];
                $Logger$({...$initial$,$message$:"Se detectó que se accedió a la API sin un origen HTTP. Se procede a verificar mediante una Dirección IP de origen con la siguiente lista \""+$origin$+"\"...",$type$:"info"});
                if(!$origin$["includes"]($rq["clientIp"] || "")){
                    $Logger$({...$initial$,$message$:"La dirección IP de origen \""+$rq["clientIp"]+"\" no está autorizada en la API. Se procede a omitir la inicialización...",$type$:"critic"});
                    $rs["status"](403)["render"]("default.pug",(await $Template$({__default__:{title:"Dirección IP no Autorizada",subtitle:"Lo sentimos. La dirección IP de dónde nos visitas no está autorizada. Solicitado al Administrador"}})));
                    $nt();
                }else{
                    $Logger$({...$initial$,$message$:"La dirección IP \""+$rq["clientIp"]+"\" está autorizada. Se procede con la inicialización de la API...",$type$:"success"});
                    $nt();
                }
            }
        }else{
            $origin$ = $__parameters__$["SecureOriginHTTP"];
            $Logger$({...$initial$,$message$:"Se detectó que se accedió a la API mediante un origen HTTP. Se procede a verificar el origen HTTP mediante el siguiente listado \""+$origin$+"\"...",$type$:"info"});
            if(!$origin$["includes"]($rq["header"]("Origin") || $rq["header"]("Referer") || "")){
                $Logger$({...$initial$,$message$:"El origen HTTP solicitado \""+($rq["header"]("Origin") || $rq["header"]("Referer"))+"\" no está autorizada en la API. Se procede a omitir la inicialización...",$type$:"critic"});
                $rs["status"](403)["render"]("default.pug",(await $Template$({__default__:{title:"Origen HTTP no Permitida",subtitle:"Lo sentimos. El origen HTTP de dónde nos visitas no está permitida. Solicitalo al Administrador"}})));
                $nt();
            }else{
                $Logger$({...$initial$,$message$:"El origen HTTP \""+($rq["header"]("Origin") || $rq["header"]("Referer"))+"\" está autorizada en la API. Se procede con la inicialización de la API...",$type$:"success"});
                $nt();
            }
        }
    }
};