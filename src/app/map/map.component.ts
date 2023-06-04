import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
} from '@angular/core';
import * as L from 'leaflet';
import { Icon } from 'leaflet';
import { Fountain } from '../types/Fountain';
import { Building } from '../types/Building';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Output() selectedFountain = new EventEmitter<Fountain>();
  @Input() buildings: Building[] = [];
  @Input() set userLocation(location: GeolocationPosition | undefined) {
    // When the user's location is updated, move the map to that position
    if (location != undefined)
      this.zoomTo(location.coords.latitude, location.coords.longitude);
  }
  @Input() set fountain(fountain: Fountain | undefined) {
    if (fountain != undefined)
      this.zoomTo(fountain.lat.valueOf(), fountain.long.valueOf());
  }

  private map: L.Map | undefined;
  icon = new Icon({
    iconUrl: 'assets/img.png',
    iconSize: [25, 25],
  });

  // Observable that waits for the fountain data to be loaded so the map component can render
  private fountainDataLoaded: Subscription | undefined;

  constructor(private ngZone: NgZone) {}

  async ngOnInit(): Promise<void> {
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

    // Waits for the fetch event to complete and then loads data onto the map
    this.fountainDataLoaded = this.ngZone.onMicrotaskEmpty.subscribe(
      (): void => {
        this.addData();
      }
    );
  }

  private addData(): void {
    let group: L.Marker[] = [];

    this.buildings.forEach((building: Building): void => {
      building.fountains.forEach((fountain: Fountain): void => {
        const marker = L.marker([fountain.lat, fountain.long], {
          icon: this.icon,
        }).on('click', () => this.selectedFountain.emit(fountain));
        group.push(marker);
      });
    });

    // Unsubscribe from the observable once fountain data is loaded
    if (this.buildings.length > 0) this.fountainDataLoaded?.unsubscribe();

    this.addCluster(...group);
    group = [];
  }

  private addCluster(...markers: L.Marker[]): void {
    // @ts-ignore
    const group = new L.MarkerClusterGroup();

    for (const marker of markers) {
      group.addLayer(marker);
    }

    this.map?.addLayer(group);
  }

  private zoomTo(lat: number, long: number): void {
    this.map?.flyTo(L.latLng(lat, long), 18);
  }
}
