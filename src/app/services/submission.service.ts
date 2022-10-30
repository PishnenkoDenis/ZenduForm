import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { ISubmission } from '../models/submission';

@Injectable({
  providedIn: 'root',
})
export class SubmissionService {
  $submissions: Subject<ISubmission[]> = new Subject<ISubmission[]>();
  submissions: ISubmission[] = [];

  constructor(private httpClient: HttpClient) {}

  updateSubmissions() {
    this.httpClient
      .get('http://localhost:3000/submissions')
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
