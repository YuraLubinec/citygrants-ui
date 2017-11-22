import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ClientPageComponent } from './client-page/client-page.component';
import {JuryPageComponent} from "./jury-page/jury-page.component";
import { RoutingModule } from "./routing/routing.module";

@NgModule({
  declarations: [
    AppComponent,
    ClientPageComponent,
    JuryPageComponent,
  ],
  imports: [
    BrowserModule, RoutingModule, FormsModule, ReactiveFormsModule, HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
