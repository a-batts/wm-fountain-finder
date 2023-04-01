import { PrismaService } from "../services/PrismaService";
import { Prisma, Building } from "../client";
import { BuildingModel } from "../models";
export declare class BuildingsRepository {
    protected prisma: PrismaService;
    get collection(): Prisma.BuildingDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;
    get groupBy(): any;
    protected deserialize<T>(obj: null | Building | Building[]): T;
    findUnique(args: Prisma.BuildingFindUniqueArgs): Promise<BuildingModel | null>;
    findFirst(args: Prisma.BuildingFindFirstArgs): Promise<BuildingModel | null>;
    findMany(args?: Prisma.BuildingFindManyArgs): Promise<BuildingModel[]>;
    create(args: Prisma.BuildingCreateArgs): Promise<BuildingModel>;
    update(args: Prisma.BuildingUpdateArgs): Promise<BuildingModel>;
    upsert(args: Prisma.BuildingUpsertArgs): Promise<BuildingModel>;
    delete(args: Prisma.BuildingDeleteArgs): Promise<BuildingModel>;
    deleteMany(args: Prisma.BuildingDeleteManyArgs): Promise<Prisma.BatchPayload>;
    updateMany(args: Prisma.BuildingUpdateManyArgs): Promise<Prisma.BatchPayload>;
    aggregate(args: Prisma.BuildingAggregateArgs): Promise<Prisma.GetBuildingAggregateType<{
        where?: Prisma.BuildingWhereInput;
        orderBy?: Prisma.Enumerable<Prisma.BuildingOrderByWithRelationInput>;
        cursor?: Prisma.BuildingWhereUniqueInput;
        take?: number;
        skip?: number;
        _count?: true | Prisma.BuildingCountAggregateInputType;
        _avg?: Prisma.BuildingAvgAggregateInputType;
        _sum?: Prisma.BuildingSumAggregateInputType;
        _min?: Prisma.BuildingMinAggregateInputType;
        _max?: Prisma.BuildingMaxAggregateInputType;
    }>>;
}
