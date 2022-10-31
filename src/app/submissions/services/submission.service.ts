import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject} from 'rxjs';
import { environment } from 'src/environments/environment';

import { ISubmission } from '../models/submission';


@Injectable({
  providedIn: 'root',
})
export class SubmissionService {
  $submissions: BehaviorSubject<ISubmission[]> = new BehaviorSubject<ISubmission[]>([]);
  submissions: ISubmission[] = [];

  constructor(private httpClient: HttpClient) {}

  updateSubmissions() {
    this.httpClient
      .get(`${environment.apiUrl}/submissions`)
      .subscribe((submissions: ISubmission[]) => {
        this.submissions = submissions;
        this.$submissions.next(submissions);
      });
  }

  clearSubmissions() {
    this.$submissions.next([]);
    this.submissions = [];
  }

  filterSubmissions(option: string) {
    this.$submissions.next(this.internalFilter(option));
  }

  internalFilter(options: string) {
    let submissionFiltered;
    if (options) {
      submissionFiltered = this.submissions.filter(
        (submission: ISubmission) => {
          return submission.status === options;
        }
      );
    }else{
      submissionFiltered = this.submissions;
    }
    return submissionFiltered;
  }
}
