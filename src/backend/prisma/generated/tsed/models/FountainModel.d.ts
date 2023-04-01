import { Fountain } from "../client";
import { BuildingModel } from "./BuildingModel";
export declare class FountainModel implements Fountain {
    id: number;
    buildingId: number;
    floor: number;
    lat: number;
    long: number;
    location: string;
    hasBottleFiller: boolean;
    filterStatus: number;
    developerPick: boolean;
    building: BuildingModel;
}
