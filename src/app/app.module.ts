import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LogoService } from './services/logo.service';
import { HomePageModule } from './home-page/home-page.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => HomePageModule,
  },
];

@NgModule({
  declarations: [
    AppComponent,
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
