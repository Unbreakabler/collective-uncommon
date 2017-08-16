import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../chat-display/chat-display.component';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  @Input() message: Message;
  @Output() onMessageCompleted: EventEmitter<boolean> =  new EventEmitter();

  constructor() { }

  ngOnInit() {
    if (!this.message.out) {
      const originalMessage = this.message.text;
      let count = 1;
      this.message.text = originalMessage.substr(0, count);
      const interval = setInterval(() => {
        if (this.message.text.length < originalMessage.length) {
          count++;
          this.message.text = originalMessage.substr(0, count);
        } else {
          clearInterval(interval);
          this.onMessageCompleted.emit(true);
        }
      }, 20);
    } else {
      setTimeout(() => {
        this.onMessageCompleted.emit(true);
      }, 100);
    }
  }

}
