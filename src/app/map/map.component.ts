import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {HttpClient} from "@angular/common/http";
import {Icon} from 'leaflet'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnInit {
  private map: L.Map | undefined;
  buildings: any[] = [];
  icon = new Icon({
    iconUrl: 'assets/img.png',
    iconSize: [25, 25],
  })

  constructor(private client: HttpClient) { }

  async ngAfterViewInit() {
    console.log('hi')
    this.init();
    const buildings = await fetch('http://0.0.0.0:8083/rest/buildings')
    console.log(buildings)
    const json = await buildings.json()
    this.buildings = json
    this.addAll()
  }

  async ngOnInit(): Promise<void> {

  }

  private init(): void {
    this.map = L.map('map', {
      center: [ 37.270891027469624, -76.71510821725406 ],
      zoom: 16
    })

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 1,
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    });

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
    console.log(this.buildings)
    let group: L.Marker[] = [];
    for (const building of this.buildings) {
      for (const fountain of building.fountains) {
        const marker = L.marker([fountain.lat, fountain.long], {icon: this.icon});
        marker.bindPopup(`<b>${building.name}</b><br>${fountain.location}`);
        group.push(marker);
      }
      this.addCluster(...group);
      group = [];
    }
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
