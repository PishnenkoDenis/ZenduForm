import { AfterViewInit, Component, OnInit } from '@angular/core';

import * as L from 'leaflet';

import { ISubmission } from 'src/app/models/submission';
import { DataService } from 'src/app/services/data.service';
import { MarkerService } from 'src/app/services/marker.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';

const iconUrl = 'assets/marker-icon.png';

const shadowUrl = 'assets/marker-shadow.png';

const iconDefault = L.icon({

  iconRetinaUrl,

  iconUrl,

  shadowUrl,

  iconSize: [25, 41],

  iconAnchor: [12, 41],

  popupAnchor: [1, -34],

  tooltipAnchor: [16, -28],

  shadowSize: [41, 41]

});

L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  
  submissions: ISubmission[] = [];

  page: string | number = 1;
  count: number = 4;
  pages: number;

  private map;

  constructor(protected dataService: DataService, private markerService: MarkerService) { }

  ngOnInit(): void {
    this.getSubmissions();
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeMarkers(this.map);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [47.2362, 38.8969],
      zoom: 11,
      zoomControl: false
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

      maxZoom: 18,

      minZoom: 3,

      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

    });

    const baseLayers = {
      "OpenStreetMap": tiles
    };

    tiles.addTo(this.map);
    L.control.layers(baseLayers).addTo(this.map);
    
    L.control.zoom({position: 'bottomright'}).addTo(this.map);
  }
  

  getSubmissions() {
    this.dataService.fetchSubmissions().subscribe(
      (submissions) => {
        this.submissions = submissions;
        this.pages = Math.ceil(this.submissions.length / this.count);
      },
      (error) => console.log(error)
    )

  }

}
