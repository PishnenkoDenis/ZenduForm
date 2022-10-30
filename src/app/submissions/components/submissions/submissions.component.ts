import { AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import { ISubmission} from 'src/app/models/submission';
import { DataService } from 'src/app/services/data.service';
import { SubmissionService } from 'src/app/services/submission.service';


@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit, AfterViewInit {

  submissions: ISubmission[] = [];
  page: string | number = 1;
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

  @ViewChild('status', {static: true}) private statusRef: ElementRef;

  constructor(protected dataService: DataService, private submissionService: SubmissionService) {
    this.submissionService.updateSubmissions();
    this.submissionService.$submissions.subscribe(
      (submissions: ISubmission[]) => {
        this.submissions = submissions;
      }
    );
   }

  ngOnInit(): void {
    this.getSubmissinons();
  }

  ngAfterViewInit(): void {

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

  getSubmissinons() {
    this.dataService.fetchSubmissions().subscribe(
      (submissions) => {
        this.submissions = submissions;
        this.pages = Math.ceil(this.submissions.length / this.count);
      },
      (error) => console.log(error)
    );

  }

}
