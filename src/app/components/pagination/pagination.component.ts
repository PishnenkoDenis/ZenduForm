import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';

import paginate from 'jw-paginate';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() items: Array<any>;
  @Output() changePage = new EventEmitter<any>(true);
  @Input() initialPage = 1;
  @Input() pageSize = 9;
  @Input() maxPages = 9;

  pager: any = {};

  constructor() { }

  ngOnInit(): void {
    if(this.items && this.items.length) {
      this.setPage(this.initialPage);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.items.currentValue !== changes.items.previousValue) {
      this.setPage(this.initialPage);
    }
  }

   setPage(page: number) {
    this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages);

    let pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.changePage.emit(pageOfItems);
  }

}
