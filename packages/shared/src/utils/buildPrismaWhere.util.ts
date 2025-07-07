// Prisma-barát általános filter util Date és Enum támogatással

interface FilterOptions {
    contains?: string;
    equals?: string | number | boolean | Date;
    lt?: number | Date;
    lte?: number | Date;
    gt?: number | Date;
    gte?: number | Date;
    isTrue?: boolean;
    isFalse?: boolean;
}

type FilterInput<T> = {
    [K in keyof T]?: FilterOptions;
};

export function buildPrismaWhere<T>(filters: FilterInput<T>): any {
    const where: any = {};

    Object.entries(filters).forEach(([key, options]) => {
        if (!options) return;

        if (options.contains !== undefined) {
            where[key] = {
                contains: options.contains,
                mode: "insensitive",
            };
        } else if (options.equals !== undefined) {
            where[key] = options.equals;
        } else {
            const ops: any = {};
            if (options.lt !== undefined) ops.lt = options.lt;
            if (options.lte !== undefined) ops.lte = options.lte;
            if (options.gt !== undefined) ops.gt = options.gt;
            if (options.gte !== undefined) ops.gte = options.gte;
            if (options.isTrue) ops.equals = true;
            if (options.isFalse) ops.equals = false;
            if (Object.keys(ops).length > 0) {
                where[key] = ops;
            }
        }
    });

    return where;
}
