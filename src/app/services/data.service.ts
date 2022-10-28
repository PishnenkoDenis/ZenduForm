import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Submission } from '../models/submission';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  fetchSubmissions(): Observable<Submission[]>{
    return this.httpClient.get<Submission[]>('http://localhost:3000/submissions');
  }
}
