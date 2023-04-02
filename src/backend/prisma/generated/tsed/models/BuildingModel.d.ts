import { Building } from "../client";
import { FountainModel } from "./FountainModel";
export declare class BuildingModel implements Building {
    id: number;
    name: string;
    floors: string;
    isPublic: boolean;
    fountains: FountainModel[];
}
