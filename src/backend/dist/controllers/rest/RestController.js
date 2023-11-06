"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestController = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@tsed/di");
const schema_1 = require("@tsed/schema");
const client_1 = require("@prisma/client");
const platform_params_1 = require("@tsed/platform-params");
let RestController = class RestController {
    prisma;
    get(fountains) {
        return this.prisma.building.findMany({ include: { fountains: fountains } });
    }
    getFountains() {
        return this.prisma.fountain.findMany();
    }
};
tslib_1.__decorate([
    (0, di_1.Inject)(),
    tslib_1.__metadata("design:type", client_1.PrismaClient)
], RestController.prototype, "prisma", void 0);
tslib_1.__decorate([
    (0, schema_1.Get)("/buildings"),
    tslib_1.__param(0, (0, platform_params_1.QueryParams)("fountains")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Boolean]),
    tslib_1.__metadata("design:returntype", void 0)
], RestController.prototype, "get", null);
tslib_1.__decorate([
    (0, schema_1.Get)("/fountains"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], RestController.prototype, "getFountains", null);
RestController = tslib_1.__decorate([
    (0, di_1.Controller)("/")
], RestController);
exports.RestController = RestController;
//# sourceMappingURL=RestController.js.map