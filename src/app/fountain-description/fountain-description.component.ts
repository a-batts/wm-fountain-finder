import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Fountain } from '../types/Fountain';
import { FilterStatus } from '../types/FilterStatus';

@Component({
  selector: 'app-fountain-description',
  templateUrl: './fountain-description.component.html',
  styleUrls: ['./fountain-description.component.scss'],
})
export class FountainDescriptionComponent {
  @Input() fountain: Fountain | undefined;
  @Output() fountainChange = new EventEmitter<Fountain>();

  showingFilterStatusPopup: boolean = false;

  closeDescriptionPanel(): void {
    this.fountain = undefined;
    this.showingFilterStatusPopup = false;
  }

  showFilterStatusPopup(): void {
    this.showingFilterStatusPopup = true;
  }

  reportFilterStatus(status: FilterStatus): void {
    this.showingFilterStatusPopup = false;

    //Now do something with the status on the back end
    //Ideally should save to a database
    console.log(status);
  }

  zoomToFountain(): void {
    //TODO
  }
}
