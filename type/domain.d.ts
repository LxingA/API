/*
@author LxingA
@project CodeInk
@name API
@description Definición del Prototipo para los Dominios Públicos del Proyecto
@date 17/02/2024 09:30PM
*/
import type Database,{Language} from "./database";

/** Definición del Interfaz de los Dominios Públicos del Proyecto */
interface Domain extends Database {
    /** Nombre Identificable Corto para el Dominio Público del Proyecto */
    name: string,
    /** Indicar sí el Dominio Público está Activo en el Proyecto */
    active?: boolean,
    /** Definición del Dominio en Formato FQDN para el Dominio Público en el Proyecto */
    fqdn: string,
    /** Descripción Acerca del Propósito del Dominio Público en el Proyecto */
    description?: Language,
    /** Fecha de Registro del Dominio Público en el ICANN */
    registrar: Date
};

export default Domain;