/*
@author LxingA
@project CodeInk
@name API
@description Integración de BunnyCDN como Almacenamiento Global del Proyecto
@date 19/03/24 05:00PM
*/
import $Parameters$ from '../util/params';
import Engine from 'bunnycdn-storage';

/** Definición Básico del Objeto de Respuesta de AXIOS en la API del Almacenamiento */
export type ResponseObject = {
    /** Identificador Único del Archivo en UUID */
    Guid: string,
    /** Nombre del Archivo Almacenado en el Cubo */
    ObjectName: string,
    /** Tamaño del Archivo en Bytes */
    Length: number,
    /** Fecha de Modificación del Archivo en Formato ISO */
    LastChanged: string,
    /** Fecha de Creación del Archivo en Formato ISO */
    DateCreated: string
};

/** Instancia del Almacenamiento Global para la API */
const $Storage$ = async($suffix$:string) => {
    const $token$: string = (await $Parameters$())["CkGlobCDNStorageZone"][$suffix$];
    return (new Engine($token$,`ckbucketapp-${$suffix$}`));
};

export default $Storage$;