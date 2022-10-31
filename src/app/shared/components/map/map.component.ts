import {
  AfterViewInit,
  Component,
  Renderer2,
  ViewChildren
} from '@angular/core';

import * as L from 'leaflet';

import { ISubmission } from 'src/app/submissions/models/submission';
import { MarkerService } from '../../services/marker.service';
import { SubmissionService } from 'src/app/submissions/services/submission.service';

const iconRetinaUrl = 'assets/MapMarker.svg';

const iconUrl = 'assets/MapMarker.svg';

const shadowUrl = 'assets/marker-shadow.png';

const iconDefault = L.icon({
  iconRetinaUrl,

  iconUrl,

  shadowUrl,

  iconSize: [25, 41],

  iconAnchor: [12, 41],

  popupAnchor: [1, -34],

  tooltipAnchor: [16, -28],

  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {

  submissions: ISubmission[] = [];

  page: string | number = 1;
  count = 4;
  pages: number;

  map: any;

  constructor(
    private submissionService: SubmissionService,
    private markerService: MarkerService,
  ) {
    this.getSubmissions();
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeMarkers(this.map);
    this.map.on('click', (e: L.LeafletMouseEvent) => this.addMarker(e));
  }

  removeMarkers() {
    this.markerService.deleteMarkers(this.map);
  }

  addMarker(e: L.LeafletMouseEvent) {
   this.markerService.addMarker(e, this.map);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [47.2362, 38.8969],
      zoom: 11,
      zoomControl: false,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,

        minZoom: 3,

        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    const googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    const baseLayers = {
      OpenStreetMap: tiles,
      googleStreets
    };

    tiles.addTo(this.map);
    L.control.layers(baseLayers).addTo(this.map);

    L.control.zoom({ position: 'bottomright' }).addTo(this.map);
  }


  getSubmissions() {
    this.submissionService.$submissions.subscribe(
      (submissions) => {
        this.submissions = submissions;
        this.pages = Math.ceil(this.submissions.length / this.count);
      },
      (error) => console.log(error)
    );
  }

toggleMarkers(){
  this.markerService.toggleMarkers(this.map);
}

}
