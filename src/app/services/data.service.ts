import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  fetchSubmissions() {
    return this.httpClient.get<any>('http://localhost:3000/submissions');
  }
}
