import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClientPageComponent } from './client-page/client-page.component';
import { RoutingModule } from "./routing/routing.module";

@NgModule({
  declarations: [
    AppComponent,
    ClientPageComponent
  ],
  imports: [
    BrowserModule, RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
