import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';
import {ParseResult} from "papaparse";

interface Fountain {
  floor: number | string;
  lat: number;
  lon: number;
  fillingStation: boolean;
  filterStatus: 'Green' | 'Yellow' | 'Red' | 'None';
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class FountainsService {
  public buildings: { [key: string]: Fountain[] } = Object.create(null);

  constructor() { }

  *[Symbol.iterator]() {
    for (let building in this.buildings) {
      yield building;
    }
  }

  async init(): Promise<void> {
    await this.loadFountains('assets/locations_academic.csv');
    await this.loadFountains('assets/locations_residence.csv');
  }

  public async loadFountains(file: string) {
    await Papa.parse(file, {
      download: true,
      dynamicTyping: true,
      complete: (results) => {
        this.parse(results);
      }
    });
  }

  private parse(results: ParseResult<any>) {
    results.data.splice(0, 6)
    for (const [i, row] of results.data.entries()) {
      const [building, floor, lat, lon, fillingStation, filterStatus, description] = row;
      if (!this.buildings[building]) this.buildings[building] = [];

      // Rows have the building name, and then the following rows are null for the building name but contain more fountains
      if (!building) {
        this.buildings[Object.keys(this.buildings)[Object.keys(this.buildings).length - 1]].push({
          floor, lat, lon, fillingStation,
          filterStatus, description
        });
        continue;
      }

      this.buildings[building].push({
        floor, lat, lon, fillingStation,
        filterStatus, description
      });
    }
  }
}
