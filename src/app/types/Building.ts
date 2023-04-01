import { Floor } from './Floor';

export class Building {
  public name: string;
  public floors: Floor[];
  constructor(name: string, floors: Floor[]) {
    this.name = name;
    this.floors = floors;
  }
}
