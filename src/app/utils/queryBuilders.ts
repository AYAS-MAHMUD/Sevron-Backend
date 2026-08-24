// T = model name
// TwhereInput = where input type
// TincludeInput = include input type

import {
  IQueryConfig,
  IQueryParams,
  PrismaCountArgs,
  PrismaFindManyQueryBuilder,
  PrismaModelDelegate,
  PrismaStringFilter,
  PrismaWhereConditions,
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

  search(): this {
    const { searchTerm } = this.queryParams;
    const { searchableFields } = this.config;
    if (searchTerm && searchableFields && searchableFields.length > 0) {
      const searchConditions: Record<string, unknown>[] = searchableFields.map(
        (field) => {
          if (field.includes(".")) {
            const parts = field.split(".");

            if (parts.length == 2) {
              const [relation, nestedField] = parts;

              const stringFilter: PrismaStringFilter = {
                contains: searchTerm,
                mode: "insensitive" as const,
              };

              return {
                [relation]: {
                  [nestedField]: stringFilter,
                },
              };
            } else if (parts.length == 3) {
              const [relation, nestedRelation, nestedField] = parts;
              const stringFilter: PrismaStringFilter = {
                contains: searchTerm,
                mode: "insensitive" as const,
              };
              return {
                [relation]: {
                  some: {
                    [nestedRelation]: {
                      [nestedField]: stringFilter,
                    },
                  },
                },
              };
            }
          }
          // direct field
          const stringFilter: PrismaStringFilter = {
            contains: searchTerm,
            mode: "insensitive" as const,
          };

          return {
            [field]: stringFilter,
          };
        },
      );
      const whereConditions = this.query.where as PrismaWhereConditions;

      whereConditions.OR = searchConditions;

      const countWhereConditions = this.countQuery
        .where as PrismaWhereConditions;
      countWhereConditions.OR = searchConditions;
    }

    return this;
  }
}
