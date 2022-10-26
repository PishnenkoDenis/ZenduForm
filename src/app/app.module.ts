import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from  '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubmissionsComponent } from './pages/submissions/submissions.component';
import { HeaderComponent } from './components/header/header.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    SubmissionsComponent,
    HeaderComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserModule,
    HttpClientModule,
    JwPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
