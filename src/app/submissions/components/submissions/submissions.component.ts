import { Component, OnDestroy } from '@angular/core';

import { ISubmission} from '../../models/submission';
import { SubmissionService } from '../../services/submission.service';


@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnDestroy {

  submissions: ISubmission[] = [];
  page = 1;
  count = 9;
  pages: number;

  statusItems: Array<object> = [
    {value: '', status: 'Select Status'},
    {value: 'Low Risk', status: 'Low Risk'},
    {value: 'Uncomplete', status: 'Uncomplete'},
    {value: 'Unassigned', status: 'Unassigned'},
  ];

  selectItems: Array<object> = [{value: '', status: 'Select Form'}];

  isAllChecked = false;

  itemSelectedIndex: object = {};

  selectedStatus: string;

  isSelectedComponent = false;

  constructor(private submissionService: SubmissionService) {
    this.submissionService.updateSubmissions();
    this.submissionService.$submissions.subscribe(
      (submissions: ISubmission[]) => {
        this.submissions = submissions;
        this.pages = Math.ceil(this.submissions.length / this.count);
      }
    );
   }

  selectComponent(value: boolean) {
    this.isSelectedComponent = value;
  }

  changeChecked() {
    this.isAllChecked = !this.isAllChecked;
  }

  getSelectedList(value: string) {
    this.selectedStatus = value;
    this.submissionService.filterSubmissions(this.selectedStatus);
  }

  setItemSelected(index: any) {
    this.itemSelectedIndex[index] || this.itemSelectedIndex[index] === 0
    ? delete this.itemSelectedIndex[index] : this.itemSelectedIndex[index] = index;
  }

  ngOnDestroy(): void {
    this.submissionService.clearSubmissions();
  }


  get itemsAmount(){
    return `${(this.page - 1) * this.count + 1} - ${this.page * this.count}`;

  }


}
