import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IButton } from '../app.types';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
})
export class RowComponent implements OnInit {
  @Input('buttons') buttons: IButton[] = [];
  @Output('clicked') clicked = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  buttonClicked(button: IButton) {
    this.clicked.emit(button);
  }
}
