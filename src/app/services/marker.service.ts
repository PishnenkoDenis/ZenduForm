import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  places: string = '/assets/data/markers.json';

  constructor(private httpClient: HttpClient) { }

  makeMarkers(map: L.map): void {
    this.httpClient.get(this.places).subscribe(
      (result: any) => {
        for(const place of result.features) {

          const lon = place.geometry.coordinates[0];
          const lat = place.geometry.coordinates[1];

          const marker = L.marker([lon, lat]);

          marker.addTo(map);
        }
      }
    )
  }
}
