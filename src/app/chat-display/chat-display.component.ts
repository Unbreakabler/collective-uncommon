import { Component, OnInit, Input } from '@angular/core';

export const messages = [
  {
    messageId: 1,
    out: false,
    text: 'What the fuck do you want?',
  },
  {
    messageId: 2,
    out: true,
    text: 'What is this?',
  },
  {
    messageId: 3,
    out: false,
    text: 'Uhhh, it\'s a conversation... what do you want?',
  },
  {
    messageId: 4,
    out: true,
    text: 'If this is a conversation, who am I speaking too?',
  },
  {
    messageId: 5,
    out: false,
    text: 'The Collective Uncommon.',
  },
];

export interface Message {
  messageId: number;
  out: boolean;
  text: string;
}

@Component({
  selector: 'app-chat-display',
  templateUrl: './chat-display.component.html',
  styleUrls: ['./chat-display.component.scss']
})
export class ChatDisplayComponent implements OnInit {

  @Input() public messages: Message[];
  count = 0;

  constructor() { }

  ngOnInit() {
    this.messages = [messages[this.count]];
  }

  public nextMessage() {
    this.count++;
    if (messages[this.count]) {
      this.messages.push(messages[this.count]);
    }
  }
}
