/*
@author LxingA
@project CodeInk
@name API
@description Integración de BunnyCDN como Almacenamiento Global del Proyecto
@date 19/03/24 05:00PM
*/
import 'dotenv/config';
import Engine from 'bunnycdn-storage';

/** Instancia del Almacenamiento Global para la API */
const $Storage$ = ($suffix$:string) => (new Engine(process["env"]["CkAPIEnvironmentStorageKeyAccess"],`ckbucketapp-${$suffix$}`));

export default $Storage$;