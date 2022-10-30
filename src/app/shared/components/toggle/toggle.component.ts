import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})

export class ToggleComponent {

  @Output() selectedComponent = new EventEmitter<boolean>();

  constructor() { }

  selectComponent(value: boolean) {
    this.selectedComponent.emit(value);
  }

}
