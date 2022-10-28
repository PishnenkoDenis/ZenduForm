import { AfterViewInit, Component, OnInit } from '@angular/core';

import * as L from 'leaflet';

import { Submission } from 'src/app/models/submission';
import { DataService } from 'src/app/services/data.service';
import { MarkerService } from 'src/app/services/marker.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  
  submissions: Submission[] = [];

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
      zoom: 6
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

      maxZoom: 18,

      minZoom: 3,

      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

    });

    tiles.addTo(this.map);
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
