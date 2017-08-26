import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from '../app.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { LogoComponent } from '../logo/logo.component';
import { ChatComponent } from '../chat/chat.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { ChatDisplayComponent } from '../chat-display/chat-display.component';
import { LinkComponent } from '../link/link.component';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatInputOptionComponent } from '../chat-input-option/chat-input-option.component';
import { LogoService } from '../services/logo.service';
import { CanvasBackgroundComponent } from '../canvas-background/canvas-background.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      { path: '',    component: ChatComponent },
      { path: 'about', component: ChatComponent }
    ]
  }
];

@NgModule({
  declarations: [
    HomePageComponent,
    CanvasBackgroundComponent,
    LinkComponent,
    LogoComponent,
    ChatComponent,
    ChatInputComponent,
    ChatDisplayComponent,
    ChatMessageComponent,
    ChatInputOptionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
      routes,
    )
  ],
  providers: [
    LogoService,
  ]
})
export class HomePageModule { }
