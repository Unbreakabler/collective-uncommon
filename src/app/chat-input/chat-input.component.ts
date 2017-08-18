import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {

  @Output() onOptionSelected: EventEmitter<any> = new EventEmitter();
  @Input() public options: any[];

  constructor() { }

  ngOnInit() {}

  public optionSelected(event: any) {
    this.onOptionSelected.emit(event);
  }

}
