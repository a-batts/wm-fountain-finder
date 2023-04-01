"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FountainModel = void 0;
const schema_1 = require("@tsed/schema");
const BuildingModel_1 = require("./BuildingModel");
class FountainModel {
}
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Required)(),
    __metadata("design:type", Number)
], FountainModel.prototype, "id", void 0);
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Required)(),
    __metadata("design:type", Number)
], FountainModel.prototype, "buildingId", void 0);
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Required)(),
    __metadata("design:type", Number)
], FountainModel.prototype, "floor", void 0);
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Required)(),
    __metadata("design:type", Number)
], FountainModel.prototype, "lat", void 0);
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Required)(),
    __metadata("design:type", Number)
], FountainModel.prototype, "long", void 0);
__decorate([
    (0, schema_1.Property)(String),
    (0, schema_1.Required)(),
    __metadata("design:type", String)
], FountainModel.prototype, "location", void 0);
__decorate([
    (0, schema_1.Property)(Boolean),
    (0, schema_1.Required)(),
    __metadata("design:type", Boolean)
], FountainModel.prototype, "hasBottleFiller", void 0);
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Required)(),
    __metadata("design:type", Number)
], FountainModel.prototype, "filterStatus", void 0);
__decorate([
    (0, schema_1.Property)(Boolean),
    (0, schema_1.Required)(),
    __metadata("design:type", Boolean)
], FountainModel.prototype, "developerPick", void 0);
__decorate([
    (0, schema_1.Property)(() => BuildingModel_1.BuildingModel),
    (0, schema_1.Required)(),
    __metadata("design:type", BuildingModel_1.BuildingModel)
], FountainModel.prototype, "building", void 0);
exports.FountainModel = FountainModel;
