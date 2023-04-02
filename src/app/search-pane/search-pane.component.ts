import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Floor } from '../types/Floor';
import { Building } from '../types/Building';
import { HttpClient } from '@angular/common/http';
import { Fountain } from '../types/Fountain';
import { FilterStatus } from '../types/FilterStatus';

@Component({
  selector: 'app-search-pane',
  templateUrl: './search-pane.component.html',
  styleUrls: ['./search-pane.component.scss'],
})
export class SearchPaneComponent implements OnInit {
  @Output() selectedFountain = new EventEmitter<Fountain>();

  //The floor the user wants to view fountains for when searching
  selectedFloor: Floor;
  buildingSelector = new FormControl('');
  buildings: Building[] = [];
  filteredOptions: Observable<Building[]>;
  isValidBuilding: boolean = false;
  constructor(private client: HttpClient) {
    this.selectedFloor = Floor.Any;

    this.filteredOptions = this.buildingSelector.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || ''))
    );
  }

  ngOnInit(): void {
    this.client
      .get('/rest/buildings')
      .subscribe((result) => this.initBuildings(result as Object[]));
  }

  /**
   * Get the possible floor options for the currently selected building.
   * If the current selection is not a valid building only "Any floor"
   * will be displayed, as it is the fallback default option.
   */
  getPossibleFloors(): string[] {
    let possibleFloors: string[] = [];

    //Whether the entered building name is a valid building
    this.isValidBuilding = false;

    this.buildings.forEach((building: Building) => {
      if (building.name == this.buildingSelector.value) {
        possibleFloors = building.floors;

        //The building matches so it is valid
        this.isValidBuilding = true;
      }
    });

    return [Floor.Any.valueOf(), ...possibleFloors];
  }

  get possibleBuildingFountains(): Fountain[] {
    let possibleFountains: Fountain[] = [];

    this.buildings.forEach((building: Building) => {
      if (building.name == this.buildingSelector.value) {
        possibleFountains = building.fountains;
      }
    });

    //Return the fountains that match the selected filter, or all of the fountains if all floors is selected
    return possibleFountains.filter(
      (fountain: Fountain) =>
        fountain.floor == this.selectedFloor || this.selectedFloor == Floor.Any
    );
  }

  /**
   * Initialize all building objects to enable the search box autofill capabilities,
   * and the floor selector for each building
   * @param buildings
   * @private
   */
  private initBuildings(buildings: Object[]): void {
    buildings.forEach((building: any) => {
      let floors: Floor[] = [];
      let fountains: Fountain[] = [];

      //Add the existing floors to the building
      let buildingFloors: string = building.floors;
      if (buildingFloors.includes('0')) floors.push(Floor.Basement);
      if (buildingFloors.includes('1')) floors.push(Floor.First);
      if (buildingFloors.includes('2')) floors.push(Floor.Second);
      if (buildingFloors.includes('3')) floors.push(Floor.Third);
      if (buildingFloors.includes('4')) floors.push(Floor.Fourth);

      building.fountains.forEach((fountain: any) => {
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
            fountain.filterStatus as FilterStatus,
            fountain.developerPick,
            building.name
          )
        );
      });

      this.buildings.push(new Building(building.name, floors, fountains));
    });
  }

  /**
   * Get the user's current location, if they have location permissions turned on.
   * If not request for location permissions, using the browser API. If declined,
   * there should be some sort of fallback message.
   */
  getCurrentLocation(): void {
    alert('To be implemented!');
  }

  /**
   * Zoom to the selected fountain on the map
   * @param fountain
   */
  zoomToFountain(fountain: Fountain): void {
    this.selectedFountain.emit(fountain);
    alert('Zoom to be implemented!');
  }

  /**
   * Filter possible buildings based on the search value
   * @param value
   * @private
   */
  private _filter(value: string): Building[] {
    const filterValue = value.toLowerCase();

    return this.buildings.filter((building: Building) =>
      building.name.toLowerCase().includes(filterValue)
    );
  }
}
