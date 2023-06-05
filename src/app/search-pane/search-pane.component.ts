import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Floor } from '../types/Floor';
import { Building } from '../types/Building';
import { Fountain } from '../types/Fountain';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as geolib from 'geolib';

export enum ResultsMode {
  NONE,
  QUERY,
  LOCATION,
}

@Component({
  selector: 'app-search-pane',
  templateUrl: './search-pane.component.html',
  styleUrls: ['./search-pane.component.scss'],
})
export class SearchPaneComponent {
  @Output() selectedFountain = new EventEmitter<Fountain>();
  @Output() gotUsersLocation = new EventEmitter<GeolocationPosition>();
  @Input() buildings: Building[] = [];

  // If results are hidden, are being shown by location, or by query
  resultsMode: ResultsMode = ResultsMode.NONE;

  // The user's position
  private userPosition: GeolocationPosition | undefined;

  // The floor the user wants to view fountains for when searching
  selectedFloor: Floor;
  showingOnlyWithFillers: Boolean = false;
  buildingSelector = new FormControl('');
  filteredOptions: Observable<Building[]>;

  constructor(private _snackBar: MatSnackBar) {
    this.selectedFloor = Floor.Any;

    this.filteredOptions = this.buildingSelector.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || ''))
    );
  }

  /**
   * Get the possible floor options for the currently selected building.
   * If the current selection is not a valid building only "Any floor"
   * will be displayed, as it is the fallback default option.
   */
  getPossibleFloors(): string[] {
    let possibleFloors: string[] = [];

    if (this.resultsMode !== ResultsMode.LOCATION)
      this.resultsMode = ResultsMode.NONE;

    this.buildings.forEach((building: Building) => {
      if (building.name == this.buildingSelector.value) {
        possibleFloors = building.floors;

        // The building matches so it is valid
        this.resultsMode = ResultsMode.QUERY;
      }
    });

    return [Floor.Any.valueOf(), ...possibleFloors];
  }

  /**
   * Get the possible fountains the user might be interested in,
   * based on the selected building, selected floor, and if the user
   * is only looking for fountains with bottle fillers or not
   */
  get possibleBuildingFountains(): Fountain[] {
    let possibleFountains: Fountain[] = [];

    // If the user has shared their location, display results by location
    if (this.resultsMode === ResultsMode.LOCATION && this.userPosition) {
      const coords: GeolocationCoordinates = this.userPosition
        .coords as GeolocationCoordinates;

      // Iterate through each fountain and find the closest ones
      this.buildings.forEach((building: Building): void => {
        building.fountains.forEach((fountain: Fountain): void => {
          // Calculate the distance between the person and the fountain
          let distance = geolib.getDistance(
            [fountain.lat, fountain.long],
            [coords.latitude, coords.longitude]
          );

          // Only push very close fountains
          if (distance < 150) possibleFountains.push(fountain);

          // Sort by distance - closest fountains should be shown first
          possibleFountains.sort((a: Fountain, b: Fountain): number => {
            return (
              geolib.getDistance(
                [a.lat, a.long],
                [coords.latitude, coords.longitude]
              ) -
              geolib.getDistance(
                [b.lat, b.long],
                [coords.latitude, coords.longitude]
              )
            );
          });
        });
      });

      // Return the fountains that are closest to the user
      return possibleFountains.slice(0, 8);
    }

    // Otherwise find fountains based on the search query
    this.buildings.forEach((building: Building): void => {
      if (building.name == this.buildingSelector.value)
        possibleFountains = building.fountains;
    });

    // Return the fountains that match the selected filter, or all of the fountains if all floors is selected
    return possibleFountains.filter((fountain: Fountain): boolean => {
      // If the user is viewing only fountains with bottle fillers, hide the ones without one
      if (this.showingOnlyWithFillers && !fountain.hasFilter) return false;

      return (
        fountain.floor == this.selectedFloor || this.selectedFloor == Floor.Any
      );
    });
  }

  /**
   * Get the user's current location, if they have location permissions turned on.
   * If not request for location permissions, using the browser API. If declined,
   * there should be some sort of fallback message.
   */
  getCurrentLocation(): void {
    const locationSuccessful = (position: GeolocationPosition): void => {
      // Save the coordinates to a variable
      this.userPosition = position;
      this.resetQuery();

      // Emit that no fountain was selected so the details pane closes
      this.selectedFountain.emit(undefined);

      // Emit the user's location to the main component, so that it can be passed to the map component
      this.gotUsersLocation.emit(position);

      // Switch the results panel to fetching results based on location
      this.resultsMode = ResultsMode.LOCATION;
    };
    const locationFailed = (): void => {
      // Notify the component that the app was not able to get the user's location
      this._snackBar.open(
        "Unable to get current location. Make sure you've enabled location access.",
        'Done',
        { duration: 8000 }
      );
    };

    //Attempt to get the user's location
    navigator.geolocation.getCurrentPosition(
      locationSuccessful,
      locationFailed
    );
  }

  /**
   * Zoom to the selected fountain on the map
   * @param fountain
   */
  zoomToFountain(fountain: Fountain): void {
    this.selectedFountain.emit(fountain);

    // Reset the search box so that the search results panel becomes hidden
    this.buildingSelector.reset();
    this.resultsMode = ResultsMode.NONE;
  }

  /**
   * Reset the query back to defaults
   * @private
   */
  private resetQuery(): void {
    this.selectedFloor = Floor.Any;
    this.buildingSelector.reset();
    this.showingOnlyWithFillers = false;
  }

  /**
   * Filter possible buildings based on the search value
   * @param value
   * @private
   */
  private _filter(value: string): Building[] {
    const filterValue = value.toLowerCase();

    // When the user starts to search, unselect the currently selected fountain to hide the panel
    if (value) this.selectedFountain.emit(undefined);

    return this.buildings.filter((building: Building) =>
      building.name.toLowerCase().includes(filterValue)
    );
  }
}
