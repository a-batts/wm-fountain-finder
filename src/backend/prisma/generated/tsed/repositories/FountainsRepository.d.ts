import { PrismaService } from "../services/PrismaService";
import { Prisma, Fountain } from "../client";
import { FountainModel } from "../models";
export declare class FountainsRepository {
    protected prisma: PrismaService;
    get collection(): Prisma.FountainDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;
    get groupBy(): any;
    protected deserialize<T>(obj: null | Fountain | Fountain[]): T;
    findUnique(args: Prisma.FountainFindUniqueArgs): Promise<FountainModel | null>;
    findFirst(args: Prisma.FountainFindFirstArgs): Promise<FountainModel | null>;
    findMany(args?: Prisma.FountainFindManyArgs): Promise<FountainModel[]>;
    create(args: Prisma.FountainCreateArgs): Promise<FountainModel>;
    update(args: Prisma.FountainUpdateArgs): Promise<FountainModel>;
    upsert(args: Prisma.FountainUpsertArgs): Promise<FountainModel>;
    delete(args: Prisma.FountainDeleteArgs): Promise<FountainModel>;
    deleteMany(args: Prisma.FountainDeleteManyArgs): Promise<Prisma.BatchPayload>;
    updateMany(args: Prisma.FountainUpdateManyArgs): Promise<Prisma.BatchPayload>;
    aggregate(args: Prisma.FountainAggregateArgs): Promise<Prisma.GetFountainAggregateType<{
        where?: Prisma.FountainWhereInput;
        orderBy?: Prisma.Enumerable<Prisma.FountainOrderByWithRelationInput>;
        cursor?: Prisma.FountainWhereUniqueInput;
        take?: number;
        skip?: number;
        _count?: true | Prisma.FountainCountAggregateInputType;
        _avg?: Prisma.FountainAvgAggregateInputType;
        _sum?: Prisma.FountainSumAggregateInputType;
        _min?: Prisma.FountainMinAggregateInputType;
        _max?: Prisma.FountainMaxAggregateInputType;
    }>>;
}
