/*
@author LxingA
@project CodeInk
@name API
@description Utilidad para la Obtención de un Dominio Público de la Base de Datos para la API
@date 20/02/2024 09:00PM
*/
import $DomainEngine$ from '../database/domain';
import $EndPointEngine$ from '../database/endpoint';
import $Logger$ from './logger';

/** Obtener la Información de un Dominio Público Estructurado para la API */
const $Domain$ = async({
    __context__ = "domain_object",
    $name$,
    $subdomain$,
    $ssl$ = true,
    $direct$ = false,
    $ext = "www"
}:{
    /** Definición del Contexto Actual para el Archivador */
    __context__?: string,
    /** Nombre del Dominio Público */
    $name$?: string,
    /** Nombre del Punto Final a Definir en la Solicitud */
    $subdomain$?: string,
    /** Establecer el Dominio con el Protocolo SSL */
    $ssl$?: boolean,
    /** Retornar el Dominio sin un Formato HTTP Explisito */
    $direct$?: boolean,
    /** Definir un nombre de subdominio (www) */
    $ext?: string
}): Promise<string | null> => {
    $Logger$({$message$:"Inicializando la obtención y definición del dominio público...",$context$:__context__,$type$:"info"});
    let $$: string | null = null;
    if(typeof($ssl$) != "undefined" && $ssl$ && !$direct$) $$ = $ssl$ ? "https://" : "http://";
    try{
        let $0$,$1$,$2$;
        switch(typeof($subdomain$)){
            case "string":
                $Logger$({$message$:"Inicializando la definición del punto final con nombre \""+$subdomain$+"\"...",$context$:__context__,$type$:"info"});
                $0$ = (await $EndPointEngine$["exists"]({name:$subdomain$}));
                if($0$){
                    $Logger$({$message$:"Se encontró un punto final con el nombre solicitado \""+$subdomain$+"\". Se procede a definirlo...",$context$:__context__,$type$:"success"});
                    $1$ = (await $EndPointEngine$["findById"]($0$));
                    $2$ = (await $DomainEngine$["findById"]($1$?.domain))?.fqdn ?? "unknown.random";
                    $$ += $1$?.suffix + "." + $2$;
                }else{
                    $Logger$({$message$:"No se encontró en la base de datos el punto final con nombre \""+$subdomain$+"\". Se procede a omitirlo...",$context$:__context__,$type$:"warn"});
                    $$ = null;
                };
            break;
            default:
                $Logger$({$message$:"Inicializando la definición del dominio con nombre \""+$name$+"\"...",$context$:__context__,$type$:"info"});
                $0$ = (await $DomainEngine$["exists"]({name:$name$}));
                if($0$){
                    $Logger$({$message$:"Se encontró un dominio público con el nombre solicitado \""+$name$+"\". Se procede a definirlo...",$context$:__context__,$type$:"success"});
                    $1$ = (await $DomainEngine$["findById"]($0$));
                    $$ += ($ext ? $ext + "." : "") + ($1$?.fqdn ?? "unknown.random");
                }else{
                    $Logger$({$message$:"No se encontró en la base de datos el dominio público con nombre \""+$name$+"\". Se procede a omitirlo...",$context$:__context__,$type$:"warn"});
                    $$ = null;
                }
            break;
        }
    }catch($){
        $Logger$({$message$:"Hubo un error a definir el dominio público solicitado con nombre \""+($name$??$subdomain$)+"\" con el siguiente mensaje \""+$+"\"",$context$:__context__,$type$:"error"});
    }return $$;
};

export default $Domain$;