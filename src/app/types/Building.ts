import { Floor } from './Floor';
import { Fountain } from './Fountain';

export class Building {
  constructor(
    public name: string,
    public floors: Floor[],
    public fountains: Fountain[]
  ) {}
}
