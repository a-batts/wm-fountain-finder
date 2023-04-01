import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Prisma} from ".prisma/client";
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map: L.Map | undefined;

  constructor() { }

  ngAfterViewInit(): void {
    this.init();
  }

  private init(): void {
    this.map = L.map('map', {
      center: [ 51.505, -0.09 ],
      zoom: 3
    })

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    });

    tiles.addTo(this.map);
  }

}
