import {Component, OnInit} from '@angular/core';
import { FountainsService } from './services/fountains.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'cypher-viii';

  constructor( private fountains: FountainsService) {}

  async ngOnInit() {
    await this.fountains.init();
    await this.sleep(200);
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}





