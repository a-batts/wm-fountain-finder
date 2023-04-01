import {Controller, Inject} from "@tsed/di";
import {Get} from "@tsed/schema";
import { PrismaClient } from "@prisma/client"
import {PathParams, QueryParams} from "@tsed/platform-params";

@Controller("/")
export class RestController {

  @Inject()
  protected prisma: PrismaClient;

  @Get("/buildings")
  get(@QueryParams("fountains") fountains: boolean) {
    return this.prisma.building.findMany({ include: { fountains: fountains } });
  }

  @Get("/fountains")
  getFountains() {
    return this.prisma.fountain.findMany();
  }
}
