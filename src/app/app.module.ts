import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubmissionsComponent } from './pages/submissions/submissions.component';
import { HeaderComponent } from './components/header/header.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { MapComponent } from './components/map/map.component';
import { SearchComponent } from './shared/components/search/search.component';
import { DateComponent } from './shared/components/date/date.component';
import { SelectFormComponent } from './shared/components/select-form/select-form.component';
import { SelectStatusComponent } from './shared/components/select-status/select-status.component';


@NgModule({
  declarations: [
    AppComponent,
    SubmissionsComponent,
    HeaderComponent,
    MapComponent,
    SearchComponent,
    DateComponent,
    SelectFormComponent,
    SelectStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserModule,
    HttpClientModule,
    JwPaginationModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
