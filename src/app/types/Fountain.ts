import { Floor } from './Floor';

export class Fountain {
  constructor(
    public id: Number,
    public floor: Floor,
    public lat: Number,
    public long: Number,
    public location: String,
    public filterStatus: string,
    public developerPick: Boolean,
    public buildingName: String
  ) {}
}
