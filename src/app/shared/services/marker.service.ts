import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  places = '/assets/data/markers.json';
  markerToggle = true;

  constructor(private httpClient: HttpClient) {}

  markers = [];

  makeMarkers(map: L.map): void {
    this.httpClient.get(this.places).subscribe((result: any) => {
      for (const place of result.features) {
        const lon = place.geometry.coordinates[0];
        const lat = place.geometry.coordinates[1];

        const marker = L.marker([lon, lat], { title: 'marker' });

        this.markers.push(marker);

        marker.addTo(map);
      }
    });
  }

  deleteMarkers(map: L.map) {
    for (const marker of this.markers) {
      map.removeLayer(marker);
    }
  }

  addMarker(e: L.LeafletMouseEvent, map: L.map) {
    const marker = L.marker(e.latlng, {
      draggable: true,
      title: 'marker',
    }).addTo(map);

    this.markers.push(marker);
    map.addLayer(marker);
  }

  toggleMarkers(map: L.map) {
    this.markerToggle = !this.markerToggle;

    map.eachLayer((layer) => {
      if (layer.options.title === 'marker') {
        const opacity = this.markerToggle ? 1 : 0;
        layer.setOpacity(opacity);
      }
    });
  }
}
