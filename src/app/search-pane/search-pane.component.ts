import { Component, OnInit } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Floor } from '../types/Floor';
import { Building } from '../types/Building';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-pane',
  templateUrl: './search-pane.component.html',
  styleUrls: ['./search-pane.component.scss'],
})
export class SearchPaneComponent implements OnInit {
  //The floor the user wants to view fountains for when searching
  selectedFloor: Floor;
  buildingSelector = new FormControl('');
  buildings: Building[] = [];

  filteredOptions: Observable<Building[]>;
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

    this.buildings.forEach((building: Building) => {
      if (building.name == this.buildingSelector.value) {
        possibleFloors = building.floors;
      }
    });

    return [Floor.Any.valueOf(), ...possibleFloors];
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

      //Add the existing floors to the building
      let buildingFloors: string = building.floors;

      if (buildingFloors.includes('0')) floors.push(Floor.Basement);
      if (buildingFloors.includes('1')) floors.push(Floor.First);
      if (buildingFloors.includes('2')) floors.push(Floor.Second);
      if (buildingFloors.includes('3')) floors.push(Floor.Third);
      if (buildingFloors.includes('4')) floors.push(Floor.Fourth);

      this.buildings.push(new Building(building.name, floors));
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
