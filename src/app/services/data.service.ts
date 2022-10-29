import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISubmission } from '../models/submission';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  fetchSubmissions(): Observable<ISubmission[]>{
    return this.httpClient.get<ISubmission[]>('http://localhost:3000/submissions');
  }
}
