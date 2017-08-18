import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../chat/chat-data';

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
    this.checkInMessage();
  }

  public checkInMessage() {
    if (!this.message.out) {
      const originalMessage = this.message.text;
      this.message.text = originalMessage[0];
      this.robotTyping(originalMessage);
    } else {
      setTimeout(() => {
        this.onMessageCompleted.emit(true);
      }, 100);
    }
  }

  robotTyping(originalMessage: string | string[]) {
    let charCount = 0;
    const interval = setInterval(() => {
      if (this.message.text.length < originalMessage.length) {
        charCount++;
        // if (originalMessage[charCount] === punctuation) {

        // }
        this.message.text += originalMessage[charCount];
      } else {
        clearInterval(interval);
        this.onMessageCompleted.emit(true);
      }
    }, 20);
  }

}
