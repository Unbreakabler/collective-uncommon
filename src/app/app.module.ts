import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LogoComponent } from './logo/logo.component';
import { ChatComponent } from './chat/chat.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { ChatDisplayComponent } from './chat-display/chat-display.component';
import { LinkComponent } from './link/link.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatInputOptionComponent } from './chat-input-option/chat-input-option.component';
import { LogoService } from './services/logo.service';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LogoComponent,
    ChatComponent,
    ChatInputComponent,
    ChatDisplayComponent,
    LinkComponent,
    ChatMessageComponent,
    ChatInputOptionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      routes,
    )
  ],
  providers: [
    LogoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
