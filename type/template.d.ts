/*
@author LxingA
@project CodeInk
@name API
@description Prototipo para la Definición del Objeto con la Información Esencial para las Plantillas de la API
@date 20/02/2024 07:20PM
*/

/** Definición del Objeto con la Información Esencial para las Plantillas de la API */
type Template = {
    /** Ruta Absoluta HTTP del Punto Final para el Acceso a los Recursos Globales del Proyecto sin / final */
    $uri$: string,
    /** Versión de Edición Actual de la Aplicación */
    $version$: string,
    /** Nombre del Proyecto ó Autor de la Aplicación */
    $author$: string,
    /** Nombre Descriptivo de la Aplicación */
    $slogan$: string,
    /** Nombre de la Aplicación */
    $name$: string,
    /** Titulo Definido para Mostrar en la Plantilla de la Aplicación */
    $title$?: string,
    /** Descripción Definido Acerca de la Aplicación */
    $description$?: string,
    /** Correo Electrónico de Contacto del Proyecto para la Aplicación */
    $email$: string
};

export default Template;