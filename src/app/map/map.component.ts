import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import * as L from 'leaflet';
import { Icon } from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Fountain } from '../types/Fountain';
import { Floor } from '../types/Floor';
import { FilterStatus } from '../types/FilterStatus';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnInit {
  @Output() selectedFountain = new EventEmitter<Fountain>();
  @Input() set fountain(fountain: Fountain | undefined) {
    if (fountain != undefined)
      this.zoomTo(fountain.lat.valueOf(), fountain.long.valueOf());
  }

  private map: L.Map | undefined;
  buildings: any[] = [];
  icon = new Icon({
    iconUrl: 'assets/img.png',
    iconSize: [25, 25],
  });

  constructor(private client: HttpClient) {}

  async ngAfterViewInit() {
    console.log('hi');
    this.init();
    const buildings = await fetch('/rest/buildings');
    console.log(buildings);
    this.buildings = await buildings.json();
    this.addAll();
  }

  async ngOnInit(): Promise<void> {}

  private init(): void {
    this.map = L.map('map', {
      center: [37.270891027469624, -76.71510821725406],
      zoom: 16,
    });
    this.map.zoomControl.setPosition('bottomright');

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 1,
        attribution:
          'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      }
    );

    tiles.addTo(this.map);
  }

  private addCluster(...markers: L.Marker[]) {
    // @ts-ignore
    const group = new L.MarkerClusterGroup();

    for (const marker of markers) {
      group.addLayer(marker);
    }

    this.map?.addLayer(group);
  }

  private addAll() {
    console.log(this.buildings);
    let group: L.Marker[] = [];
    for (const building of this.buildings) {
      for (const fountain of building.fountains) {
        const marker = L.marker([fountain.lat, fountain.long], {
          icon: this.icon,
        }).on('click', () => this.setSelectedFountain(building, fountain));
        marker.bindPopup(`<b>${building.name}</b><br>${fountain.location}`);
        group.push(marker);
      }
      this.addCluster(...group);
      group = [];
    }
  }

  private setSelectedFountain(building: any, fountain: any): void {
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

    this.selectedFountain.emit(
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
  }

  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private zoomTo(lat: number, long: number): void {
    this.map?.flyTo(L.latLng(lat, long), 18);
  }
}
