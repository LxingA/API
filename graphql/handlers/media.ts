/*
@author LxingA
@project CodeInk
@name API
@description Definición del Handler para la Aplicación "Media"
@date 19/03/2024 09:30PM
*/
import $Logger$ from '../../util/logger';
import $Storage$ from '../../bin/storage';
import {GraphQLError} from 'graphql';
import {$Category$,$Anime$,$Game$} from '../../database/service/media';
import {ResponseObject} from '../../bin/storage';
import type {MediaType} from '../../type/service/media';
import type {Category,CategoryChildren,Media,MediaCategory,MediaStorage} from '../../type/service/media';
import type {Pagination,PaginationResponse} from '../../type/parameter';
import type GraphQLContext from '../../type/graphql/context';
const $LoggerContext$ = ($str$:string,$mth$:"query"|"mutate"="query") => (`media_${$mth$}_${$str$}`);

/** Objeto con los Métodos para la Definición de un Objeto en Concreto */
const $object$ = {
    $CategoryChildren$: ($value$:Record<string,CategoryChildren>,$language$:string): CategoryChildren[] => {
        const $__container__$: CategoryChildren[] = [];
        (Object["keys"]($value$)["forEach"](($1$,$2$) => {
            let $3$ = {}, $4$ = (Object["values"]($value$)[$2$])!;
            $3$["label"] = $4$["label"][$language$];
            $3$["identified"] = $1$;
            $__container__$["push"]($3$ as CategoryChildren);
        }));return $__container__$;
    }
};

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
                    if($$["children"]) $$["children"] = $object$["$CategoryChildren$"]($$["children"] as {},language);
                    return $$;
                });if($__object__$["length"] == 0) throw new GraphQLError("GraphQLQueryCategoryEmptyResponse");else return $__object__$;
            }catch($){
                $Logger$({$type$:"warn",$context$:$LoggerContext$("category"),$message$:"Hubo un error a inicializar el objeto solicitado con el siguiente mensaje \""+$+"\""});
                (new GraphQLError("GraphQLQueryErrorUnknown"));
            }
        },
        /** Obtener la Información de un Medio */
        media_content: async(_,{paginator,filter,context,search,identified}:{
            /** Definición del Páginador para el Contexto de Consulta */
            paginator?: Pagination,
            /** Contenedor con los Filtros Activos en la Aplicación para el Contexto de Consulta */
            filter?: string[],
            /** Contexto Actual de la Definición de la Aplicación */
            context: MediaType,
            /** Palabras Iniciales para la Definición del Contexto de Búsqueda en el Medio */
            search?: string,
            /** Identificador Único del Medio para Filtrar */
            identified?: string
        },{language}:GraphQLContext): Promise<PaginationResponse | void> => {
            const $__isAlterMode__$: boolean = (typeof(filter) != "undefined" || typeof(search) != "undefined");
            const $__storage__$ = (await $Storage$("media"));let $Database$:any;switch(context){
                case "anime":
                    $Database$ = $Anime$;
                break;
                case "game":
                    $Database$ = $Game$;
                break;
            }try{
                $Logger$({$type$:"info",$context$:$LoggerContext$(context),$message$:"Inicializando del Objeto con la Información del Medio solicitado..."});
                let $__default__$ = {active:true};
                if(search) $__default__$["name"] = (new RegExp(search,"i"));
                if(identified) $__default__$ = {...$__default__$,...{identified}};
                const $__instance__$ = $Database$["find"]($__default__$)["sort"]({createdAt:1});
                const $__paginator__$ = (async($items$:Media[]): Promise<PaginationResponse> => {
                    const $__selfTotal__$: number = ($__isAlterMode__$ ? $items$["length"] : ((await $Database$["find"]({})["exec"]())["length"]) as number);
                    return ({
                        item: $items$,
                        total: {
                            elements: $__selfTotal__$,
                            pages: Math["ceil"](Math["round"]($__selfTotal__$ / (paginator ? paginator["perPage"] : 0)))
                        }
                    } as PaginationResponse);
                });if(paginator){
                    $__instance__$["limit"](paginator["perPage"]);
                    $__instance__$["skip"](paginator["perPage"] * (paginator["currentPage"] - 1));
                }const $__object__$ = (await $__instance__$["exec"]());
                const $__container__$: Media[] = [];
                (await Promise["all"](
                    $__object__$["map"](async $ => {
                        let $$: Media = $["_doc"];
                        if($$["description"]) $$["description"] = $["description"][language];
                        if($$["meta"]){
                            const $0$: MediaCategory[] = [];
                            (await Promise["all"](
                                (Object["keys"]($$["meta"]))["map"](async $identified_category$ => {
                                    const $__requestedCategory__$: Category = (await $Category$["findById"]($identified_category$)["exec"]())!["_doc"];
                                    let $1$ = {};
                                    $1$["id"] = $__requestedCategory__$["identified"];
                                    $1$["label"] = $__requestedCategory__$["name"][language];
                                    if($__requestedCategory__$["children"]){
                                        const $__subcategory__$: CategoryChildren[] = [];
                                        const $__conversion__$ = $object$["$CategoryChildren$"]($__requestedCategory__$["children"] as {},language);
                                        (Object["keys"]($__requestedCategory__$["children"]))["forEach"](($2$,$4$) => Object["values"]($$["meta"]!)["forEach"]($3$ => $3$["includes"]($2$) && $__subcategory__$["push"]($__conversion__$[$4$])));$1$["item"] = $__subcategory__$;
                                    }$0$["push"]($1$ as MediaCategory);
                                })
                            ));$$["meta"] = $0$ as any;
                        }let $__media__$ = {};
                        (await Promise["all"](
                            ([{path:"/cover/" + context + "/",name:"cover"},{path:"/background/" + context + "/",name:"background"},{path:"/thumbnail/" + context + "/",name:"snapshot"}] as MediaStorage[])["map"](async ({path,name}) => {
                                const $__instance__$: ResponseObject[] = ((await $__storage__$["list"](path))["data"] as ResponseObject[])["filter"](({ObjectName}) => (name == "snapshot" ? (ObjectName["startsWith"]($$["_id"] as any)) : (ObjectName == `${$$["_id"]}.webp`)));
                                if($__instance__$["length"] > 0) if(name == "snapshot") $__media__$[name] = $__instance__$["map"](({ObjectName}) => (`${path}${ObjectName}`));else $__media__$[name] = `${path}${$$["_id"]}.webp`;
                            })
                        ));$$["media"] = $__media__$;
                        $__container__$["push"]($$);
                    })
                ));if(filter){
                    const $__newFilterContainer__$: Media[] = [];
                    ($__container__$["forEach"]($media$ => {
                        if($media$["meta"]) (($media$["meta"] as any) as MediaCategory[])["forEach"](({id,item}) => {
                            const $__filter__$: string[] = [];
                            (item["forEach"](({identified}) => {
                                if(identified && filter["includes"](`${id}:${identified}`)) $__filter__$["push"](`${id}:${identified}`);
                            }));if($__filter__$["toString"]() == filter["toString"]()) $__newFilterContainer__$["push"]($media$);
                        });
                    }));return (await $__paginator__$($__newFilterContainer__$));
                }else return (await $__paginator__$($__container__$));
            }catch($){
                $Logger$({$type$:"warn",$context$:$LoggerContext$(context),$message$:"Hubo un error a inicializar la obtención del objeto con la información del medio solicitado mediante el siguiente mensaje \""+$+"\""});
                (new GraphQLError("GraphQLQueryErrorUnknown"));
            }
        }
    },
};