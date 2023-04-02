import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Fountain } from '../types/Fountain';

@Component({
  selector: 'app-fountain-description',
  templateUrl: './fountain-description.component.html',
  styleUrls: ['./fountain-description.component.scss'],
})
export class FountainDescriptionComponent {
  @Input() fountain: Fountain | undefined;
  @Output() fountainChange = new EventEmitter<Fountain>();

  closeDescriptionPanel(): void {
    this.fountain = undefined;
  }
}
