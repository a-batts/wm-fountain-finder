import { Component, OnInit } from '@angular/core';
import { Fountain } from './types/Fountain';
import { Floor } from './types/Floor';
import { FilterStatus } from './types/FilterStatus';
import { HttpClient } from '@angular/common/http';
import { Building } from './types/Building';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'cypher-viii';
  buildings: Building[] = [];
  fountain: Fountain | undefined;

  constructor(private client: HttpClient) {}

  ngOnInit(): void {
    this.client
      .get('/rest/buildings')
      .subscribe((result) => this.fetchBuildings(result as Object[]));
  }

  /**
   * Initialize all building objects to enable the search box autofill capabilities,
   * and the floor selector for each building
   * @param buildings
   * @private
   */
  private fetchBuildings(buildings: Object[]): void {
    buildings.forEach((building: any): void => {
      let floors: Floor[] = [];
      let fountains: Fountain[] = [];

      //Add the existing floors to the building
      let buildingFloors: string = building.floors;
      if (buildingFloors.includes('0')) floors.push(Floor.Basement);
      if (buildingFloors.includes('1')) floors.push(Floor.First);
      if (buildingFloors.includes('2')) floors.push(Floor.Second);
      if (buildingFloors.includes('3')) floors.push(Floor.Third);
      if (buildingFloors.includes('4')) floors.push(Floor.Fourth);

      building.fountains.forEach((fountain: any): void => {
        let floor: Floor = Floor.Basement;
        switch (fountain.floor) {
          case 0:
            floor = Floor.Basement;
            break;
          case 1:
            floor = Floor.First;
            break;
          case 2:
            floor = Floor.Second;
            break;
          case 3:
            floor = Floor.Third;
            break;
          case 4:
            floor = Floor.Fourth;
            break;
        }

        fountains.push(
          new Fountain(
            fountain.id,
            floor,
            fountain.lat,
            fountain.long,
            fountain.location,
            fountain.hasBottleFiller,
            fountain.filterStatus as FilterStatus,
            fountain.developerPick,
            building.name
          )
        );
      });

      this.buildings.push(new Building(building.name, floors, fountains));
    });
  }

  onSelectedFountain(fountain: Fountain): void {
    this.fountain = fountain;
  }
}
