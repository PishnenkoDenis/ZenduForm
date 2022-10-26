import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Submission } from 'src/app/models/submission';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {

  submissions: Submission[] = [];
  pageOfItems: Array<any>;

  @ViewChild('listItem', {static: false}) listItemRef: ElementRef;

  constructor(protected dataService: DataService) { }

  ngOnInit(): void {
    this.getSubmissinons();
  }

  changePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
}

  getSubmissinons() {
    this.dataService.fetchSubmissions().subscribe(
      (submissions) => {
        this.submissions = submissions;
      },
      (error) => console.log(error)
    )
  }

}
