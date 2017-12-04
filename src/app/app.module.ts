import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ClientPageComponent } from './client-page/client-page.component';
import { JuryPageComponent } from "./jury-page/jury-page.component";
import { JuryDialogPageComponent } from './project-dialog-page/project-dialog-page.component';
import { RoutingModule } from "./routing/routing.module";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSelectModule,
MatButtonModule, MatIconModule,MatDialogModule, MatToolbarModule, MatCardModule, MatListModule} from '@angular/material';
import {MatTabsModule} from '@angular/material'


@NgModule({
  declarations: [
    AppComponent,
    ClientPageComponent,
    JuryDialogPageComponent,
    JuryPageComponent,
    
  ],
  entryComponents: [JuryDialogPageComponent],
  imports: [
    BrowserModule, RoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule,
    MatTableModule, MatSortModule,MatFormFieldModule,MatInputModule,MatPaginatorModule,MatSelectModule,MatTabsModule,
    MatInputModule, MatSelectModule,MatDialogModule,MatButtonModule,MatToolbarModule, MatCardModule, MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
