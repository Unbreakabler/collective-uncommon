import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-input-option',
  templateUrl: './chat-input-option.component.html',
  styleUrls: ['./chat-input-option.component.scss']
})
export class ChatInputOptionComponent implements OnInit {

  @Input() option: any;
  @Input() number: number;
  @Output() onOptionSelected: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onClick() {
    this.onOptionSelected.emit(this.option);
  }
}
