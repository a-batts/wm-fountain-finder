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
exports.BuildingModel = void 0;
const schema_1 = require("@tsed/schema");
const FountainModel_1 = require("./FountainModel");
class BuildingModel {
}
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Required)(),
    __metadata("design:type", Number)
], BuildingModel.prototype, "id", void 0);
__decorate([
    (0, schema_1.Property)(String),
    (0, schema_1.Required)(),
    __metadata("design:type", String)
], BuildingModel.prototype, "name", void 0);
__decorate([
    (0, schema_1.Property)(String),
    (0, schema_1.Required)(),
    __metadata("design:type", String)
], BuildingModel.prototype, "floors", void 0);
__decorate([
    (0, schema_1.Property)(Boolean),
    (0, schema_1.Required)(),
    __metadata("design:type", Boolean)
], BuildingModel.prototype, "isPublic", void 0);
__decorate([
    (0, schema_1.Property)(() => FountainModel_1.FountainModel),
    (0, schema_1.Allow)(null),
    __metadata("design:type", FountainModel_1.FountainModel)
], BuildingModel.prototype, "fountains", void 0);
exports.BuildingModel = BuildingModel;
