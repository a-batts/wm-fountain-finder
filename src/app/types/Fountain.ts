import { Floor } from './Floor';
import { FilterStatus } from './FilterStatus';

export class Fountain {
  constructor(
    public id: Number,
    public floor: Floor,
    public lat: Number,
    public long: Number,
    public location: String,
    public hasFilter: Boolean,
    public filterStatus: FilterStatus,
    public developerPick: Boolean,
    public buildingName: String
  ) {}

  getFilterColor(): string {
    switch (this.filterStatus) {
      case FilterStatus.Red:
        return 'filter-red';
      case FilterStatus.Yellow:
        return 'filter-yellow';
      case FilterStatus.Green:
        return 'filter-green';
      default:
        return '';
    }
  }
}
