import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SubmissionService } from 'src/app/services/submission.service';

@Component({
  selector: 'app-select-status',
  templateUrl: './select-status.component.html',
  styleUrls: ['./select-status.component.scss']
})
export class SelectStatusComponent implements OnInit {

  @Output() onChangedStatus = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  getStatus(value: string) {
    this.onChangedStatus.emit(value);
  }

}
