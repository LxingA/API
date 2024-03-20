/*
@author LxingA
@project CodeInk
@name API
@description Definición del Handler para la Aplicación "Media"
@date 19/03/2024 09:30PM
*/
import $Logger$ from '../../util/logger';
import {GraphQLError} from 'graphql';
import {$Category$} from '../../database/service/media';
import type {MediaType} from '../../type/service/media';
import type {Category,CategoryChildren} from '../../type/service/media';
import type GraphQLContext from '../../type/graphql/context';
const $LoggerContext$ = ($str$:string,$mth$:"query"|"mutate"="query") => (`media_${$mth$}_${$str$}`);

/** Objeto con Todos los Métodos de la Aplicación - Media */
export default {
    Query: {
        /** Obtener la Información de una Categoría */
        media_category: async(_,{context}:{
            /** Contexto Actual de la Aplicación para la Obtención de las Categorías */
            context: MediaType
        },{language}:GraphQLContext): Promise<Category[] | void> => {
            try{
                $Logger$({$type$:"info",$context$:$LoggerContext$("category"),$message$:"Inicializando la definición del objeto con la información de las categorías..."});
                const $__object__$: Category[] = (await $Category$["find"]({active:true,allow:{$in:[context]}})["exec"]())["map"]($ => {
                    let $$: Category = $["_doc"];
                    $$["name"] = $["name"][language];
                    if($$["description"]) $$["description"] = $["description"][language];
                    if($$["children"]){
                        let $0$: CategoryChildren[] = [];(Object["keys"]($["children"])["forEach"](($1$,$2$) => {
                            let $3$ = {}, $4$ = (Object["values"]($["children"])[$2$])!;
                            $3$["label"] = $4$["label"][language];
                            $3$["identified"] = $1$;
                            $0$["push"]($3$ as CategoryChildren);
                        }));$$["children"] = $0$;
                    }return $$;
                });if($__object__$["length"] == 0) throw new GraphQLError("GraphQLQueryCategoryEmptyResponse");else return $__object__$;
            }catch($){
                $Logger$({$type$:"warn",$context$:$LoggerContext$("category"),$message$:"Hubo un error a inicializar el objeto solicitado con el siguiente mensaje \""+$+"\""});
                (new GraphQLError("GraphQLQueryErrorUnknown"));
            }
        }
    }
};