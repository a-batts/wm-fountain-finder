import { Component } from '@angular/core';
import { Fountain } from './types/Fountain';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cypher-viii';
  fountain: Fountain | undefined;

  onSelectedFountain(fountain: Fountain) {
    this.fountain = fountain;
  }
}
