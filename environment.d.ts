declare global {
    namespace NodeJS {
        interface ProcessEnv {
            /** Número de Puerto Local (TCP) para el Escucha de la API en el Servidor de Origen */
            CkAPIEnvironmentPortListenHTTP: number,
            /** Definir el Contexto de la API en el Entorno Local para la Ejecución del Servidor */
            CkAPIEnvironmentDefinedContextOnAPI: "development" | "production",
            /** Nombre del Servidor a la Base de Datos Local del Proyecto sin un Protocolo */
            CkAPIEnvironmentDatabaseHost: string,
            /** Nombre del Servidor de la Base de Datos Local del Proyecto */
            CkAPIEnvironmentDatabaseName: string,
            /** Nombre de Usuario para el Acceso a la Base de Datos Local del Proyecto */
            CkAPIEnvironmentDatabaseUser: string,
            /** Contraseña de Acceso a la Base de Datos Local del Proyecto */
            CkAPIEnvironmentDatabasePass: string,
            /** Identificador UUID de la Aplicación (API) en la Base de Datos */
            CkAPIEnvironmentApplicationKey: string,
            /** Clave de Acceso para el Servicio de Obtención de las Direcciones IP de la API */
            CkAPIEnvironmentIPStaticTokenAccess: string,
            /** Clave de Acceso para el Servicio de Almacenamiento Global de la API */
            CkAPIEnvironmentStorageKeyAccess: string
        }
    }
}
export {}