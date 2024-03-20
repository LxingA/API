/*
@author LxingA
@project CodeInk
@name API
@description Definición del Handler para la Aplicación "InkExpress"
@date 09/03/2024 09:30PM
*/
import {GraphQLError} from 'graphql';
import {$Category$} from '../../database/service/inkexpress';
import {GraphQLJSON} from 'graphql-type-json';
import type {Category as CategoryPrototype,Product as ProductPrototype} from '../../type/service/inkexpress';
import type {Language as LanguagePrototype} from '../../type/database';
import type GraphQLContext from '../../type/graphql/context';
import $Logger$ from '../../util/logger';

/** Objeto con Todos los Métodos de la Aplicación - Imprenta Express */
export default {
    /** Integración del Escalador JSON para la Aplicación */
    JSON: GraphQLJSON,
    /** Objeto con Todo los Métodos para la Obtención de Información de la Aplicación */
    Query: {
        /** Método para la Obtención de los Productos Generales de la Vista de "Precios" en la Aplicación */
        category: async(_,__,{language}:GraphQLContext): Promise<CategoryPrototype[] | undefined> => {
            $Logger$({$message$:"Inicializando la definición del objeto con las categorías de la aplicación \"InkExpress\"...",$context$:"iexp_query_category"});
            const $callback$ = (value:ProductPrototype) => {
                let $0$ = value;
                if(value["name"]) $0$["name"] = value["name"][language];
                if(value["template"]) $0$["template"] = {
                    ...value["template"],
                    type: value["template"]["type"][language]
                };return $0$;
            };try{
                const $__container__$: CategoryPrototype[] = [];
                (await $Category$["find"]({}))["map"]($ => {
                    let $__object__$: CategoryPrototype = {
                        title: ($["_doc"]["title"] as LanguagePrototype)[language],
                        product: ($["_doc"]["product"] as ProductPrototype[])["map"]($callback$),
                        image: ($["_doc"]["image"]),
                        message: ($["_doc"]["message"]) ? ($["_doc"]["message"])[language] : undefined
                    };if($["subtitle"] && typeof($["subtitle"]) == "object" && $["subtitle"]["length"] > 0){
                        let $__newContext__$: Record<string,ProductPrototype[]> = {};
                        ($["subtitle"]! as LanguagePrototype[])["forEach"](($$,$$$) => {
                            $__newContext__$[$$[language]] = ($["_doc"]["product"] as ProductPrototype[][])[$$$]["map"]($callback$);
                        });$__object__$["product"] = $__newContext__$;
                    };$__container__$["push"]($__object__$);
                });return $__container__$;
            }catch($){
                $Logger$({$message$:"Hubo un error desconocido a realizar la definición del objeto con el siguiente mensaje \""+$+"\"",$context$:"iexp_query_category",$type$:"error"});
                (new GraphQLError("GraphQLQueryErrorUnknown"));
            }
        }
    }
};