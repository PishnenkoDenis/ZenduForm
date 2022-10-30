import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmissionsComponent } from './components/submissions/submissions.component';
import { BrowserModule } from '@angular/platform-browser';
import { DateComponent } from '../shared/components/date/date.component';
import { SearchComponent } from '../shared/components/search/search.component';
import { SelectStatusComponent } from '../shared/components/select-status/select-status.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MapComponent } from '../components/map/map.component';
import { ToggleComponent } from '../shared/components/toggle/toggle.component';

@NgModule({
  declarations: [
    SubmissionsComponent,
    DateComponent,
    SearchComponent,
    SelectStatusComponent,
    MapComponent,
    ToggleComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgxPaginationModule
  ],
  exports: [SubmissionsComponent]
})
export class SubmissionsModule { }
