import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {

  public options: any[];

  constructor() { }

  ngOnInit() {
    this.options = [
      { text: 'An option 1' },
      { text: 'An option 2' },
      { text: 'An option 3' },
      { text: 'An option 4' },
    ];
  }

  public optionSelected(event: any) {
    console.log(event);
  }

}
