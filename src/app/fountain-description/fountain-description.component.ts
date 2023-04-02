import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
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

  constructor(private cdr: ChangeDetectorRef) {}

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

  /**
   * Zoom to the currently selected fountain
   */
  zoomToFountain(): void {
    let fountain: Fountain = <Fountain>this.fountain;

    //Temporarily set to undefined and detach to prevent re-render
    this.cdr.detach();
    this.fountainChange.emit(undefined);

    //Super short timeout to reload the location
    setTimeout(() => {
      this.fountainChange.emit(fountain);
      //Reattach the component again after the new state, should not re-render
      this.cdr.reattach();
    }, 1);
  }
}
