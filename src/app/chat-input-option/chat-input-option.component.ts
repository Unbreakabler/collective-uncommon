import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-input-option',
  templateUrl: './chat-input-option.component.html',
  styleUrls: ['./chat-input-option.component.css']
})
export class ChatInputOptionComponent implements OnInit {

  @Input() option: any;

  constructor() { }

  ngOnInit() {
  }

}
