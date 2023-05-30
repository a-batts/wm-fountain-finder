import { Floor } from './Floor';
import { FilterStatus } from './FilterStatus';

export class Fountain {
  constructor(
    public id: number,
    public floor: Floor,
    public lat: number,
    public long: number,
    public location: string,
    public hasFilter: boolean,
    public filterStatus: FilterStatus,
    public developerPick: boolean,
    public buildingName: string
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
