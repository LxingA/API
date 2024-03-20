/*
@author LxingA
@project CodeInk
@name API
@description Implementación del Archivador de Registro para la API
@date 17/02/2024 05:30PM
*/
import 'dotenv/config';
import {existsSync,writeFileSync,appendFileSync} from 'fs';
import $Cache$ from '../bin/cache';
import $directory$ from 'path';
import $ip$ from 'node-ipinfo';
import type {IPinfo} from 'node-ipinfo';

/** Funcionalidad parar la Creación de Historial de Registros (Eventos) de la API mediante un Archivo */
const $Logger$ = ({$message$,$type$="info",$context$="default",$country$}:{
    /** Mensaje a Mostrar en la Consola */
    $message$: string,
    /** Tipo de Evento a Establecer en el Mensaje de la Consola */
    $type$?: "warn" | "info" | "error" | "critic" | "success" | "ok",
    /** Definir el Contexto a Aplicar en el Evento de la Consola */
    $context$?: string,
    /** Dirección IP de la Solicitud para Definir el País */
    $country$?: string
}): void => {
    const $fn$ = ($0$:string="LOCAL") => {
        const $file$ = $directory$["join"](__dirname,"/../logger.log");
        const $data$ = `[${$context$}::${$type$}->atTime(${(new Date())["toLocaleString"]("en-US",{timeZone:"America/Monterrey"})})->in(${$0$})] ${$message$}`;
        if(existsSync($file$)) appendFileSync($file$,"\n"+$data$,"utf8");
        else writeFileSync($file$,$data$,"utf8");
    };if(!$country$) $fn$();
    else{
        if($Cache$["has"]($country$)) $fn$($Cache$["get"]($country$));
        else{
            const $instance$ = (new $ip$(process["env"]["CkAPIEnvironmentIPStaticTokenAccess"]));
            $instance$["lookupIp"]($country$)["then"](($info$:IPinfo)=>{
                $Cache$["set"]($country$,$info$["country"]);
                $fn$($info$["country"]);
            })["catch"](_=>$fn$());
        }
    }
};

export default $Logger$;