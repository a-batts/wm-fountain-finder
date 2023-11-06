import { PrismaClient } from "@prisma/client";
export declare class RestController {
    protected prisma: PrismaClient;
    get(fountains: boolean): import(".prisma/client").Prisma.PrismaPromise<(import(".prisma/client").Building & {
        fountains: import(".prisma/client").Fountain[];
    })[]>;
    getFountains(): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Fountain[]>;
}
