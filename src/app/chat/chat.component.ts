import { Component, OnInit, Input } from '@angular/core';
import { Message, ChatOption } from './chat-data';
import { collectiveChatData, userChatOptions } from './chat-data';
import { LogoService } from '../services/logo.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() public responseData: ChatOption;
  @Input() public messages: Message[];

  private animateOut: boolean;
  private animateIn: boolean;

  constructor(
    private logoService: LogoService,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.messages = [collectiveChatData[0]];
      const currentMessage = this.messages[this.messages.length - 1];
      this.responseData = userChatOptions.find((x) =>  x.id === currentMessage.responseId );
    }, 2000);
  }

  public optionSelected(userResponse: Message) {
    this.animateOut = true;
    this.messages.push(userResponse);
    setTimeout(() => {
      this.AIresponse(userResponse);
    }, 500);
  }

  private AIresponse(userResponse: Message) {
    const currentMessage = collectiveChatData.find((x) => x.id === userResponse.responseId);
    const newMessages = this.messages.slice(0);
    newMessages.push(Object.assign({}, currentMessage));
    this.messages = newMessages;
    this.responseData = userChatOptions.find((x) =>  x.id === currentMessage.responseId );
    this.logoAnimationCheck(currentMessage);
  }

  public showOptions() {
    this.animateIn = true;
    this.animateOut = false;
  }

  private logoAnimationCheck(message: Message) {
    if (message.logoAnim) {
      Object.keys(message.logoAnim).forEach((key) => {
        const value = message.logoAnim[key];
        this.logoSwitch(key, value);
      });
    }
  }

  private logoSwitch(key: any, value: any) {
    console.log(key, value);
    switch (key) {
      case 'play': {
        value = value ? value : 1;
        this.logoService.playAnimation(value);
      }
    }
  }
}
