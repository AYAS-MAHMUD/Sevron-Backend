// T = model name
// TwhereInput = where input type
// TincludeInput = include input type

import { PrismaCountArgs, PrismaFindManyQueryBuilder } from "../interface/query.interface";

export class QueryBuilder<
  T,
  TwhereInput = Record<string, unknown>,
  TIncludeInput = Record<string, unknown>,
> {

    private query : PrismaFindManyQueryBuilder;
    private countQuery : PrismaCountArgs;
    private page : number = 1; 
    private limit : number = 10; 
    private skip : number = 0;
    private sortBy : string = "createdAt";
    private sortOrder : "asc" | "desc" = "desc";
    private selectFields : Record<string, boolean | undefined >


}

