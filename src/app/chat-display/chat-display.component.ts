import { Component, OnChanges, Input, Output, ChangeDetectionStrategy, EventEmitter, ViewChild } from '@angular/core';
import { Message } from '../chat/chat-data';

@Component({
  selector: 'app-chat-display',
  templateUrl: './chat-display.component.html',
  styleUrls: ['./chat-display.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatDisplayComponent implements OnChanges {

  @Output() public onMessagePrintComplete: EventEmitter<boolean> = new EventEmitter();
  @Input() public messages: Message[];
  @ViewChild('scroll') scrollContainer: any;

  count = 0;
  messageQueue: Message[] = [];
  currentMessage: Message;

  constructor() {}

  ngOnChanges() {
    if (this.messages[this.messages.length - 1].text instanceof Array) {
      this.multiPartResponse();
    }
  }

  public multiPartResponse() {
    this.currentMessage = this.messages[this.messages.length - 1];
    this.messages.pop();
    console.log(this.currentMessage);
    (this.currentMessage.text as string[]).forEach(text => {
      this.messageQueue.push({
        out: false,
        text: text,
        responseId: this.currentMessage.responseId,
      });
    });
    this.nextMessage();
  }

  public nextMessage() {
    if (this.messageQueue.length > 0) {
      const delay = this.currentMessage.delay ? this.currentMessage.delay : 500;
      setTimeout(() => {
        this.messages.push(this.messageQueue.shift());
      }, delay);
    } else {
      if (this.messages[this.messages.length - 1].out === false) {
        this.onMessagePrintComplete.emit(true);
      }
    }
  }
}
