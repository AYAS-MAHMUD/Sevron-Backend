// T = model name
// TwhereInput = where input type
// TincludeInput = include input type

import {
  IQueryConfig,
  IQueryParams,
  PrismaCountArgs,
  PrismaFindManyQueryBuilder,
  PrismaModelDelegate,
} from "../interface/query.interface";

// JS class
export class QueryBuilder<
  T,
  TwhereInput = Record<string, unknown>,
  TIncludeInput = Record<string, unknown>,
> {

  // Private Variable
  private query: PrismaFindManyQueryBuilder;
  private countQuery: PrismaCountArgs;
  private page: number = 1;
  private limit: number = 10;
  private skip: number = 0;
  private sortBy: string = "createdAt";
  private sortOrder: "asc" | "desc" = "desc";
  private selectFields: Record<string, boolean | undefined>;

  
  // Constractor
  constructor(
    private model: PrismaModelDelegate,
    private queryParams: IQueryParams,
    private config: IQueryConfig = {},
  ) {
    ((this.query = {
      where: {},
      include: {},
      orderBy: {},
      skip: 0,
      take: 10,
    }),
      (this.countQuery = {
        where: {},
      }));
  }

  // Method
}
