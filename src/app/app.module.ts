import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ClientPageComponent } from './client-page/client-page.component';
import { JuryPageComponent } from "./jury-page/jury-page.component";
import { JuryDialogPageComponent } from './project-dialog-page/project-dialog-page.component';
import { RoutingModule } from "./routing/routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSelectModule,
  MatButtonModule, MatIconModule, MatDialogModule, MatToolbarModule, MatCardModule, MatListModule, MatSliderModule,
  MatExpansionModule, MatStepperModule, MatSnackBarModule, MatGridListModule, MatCheckboxModule, MatSlideToggleModule, MatTooltipModule, MatMenuModule
} from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminDialogPageComponent } from './project-dialog-admin-page/project-dialog-admin-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthInterceptor } from './interceptors/AuthInterceptor';
import { ErrorInterceptor } from './interceptors/ErrorInterceptor';
import { LocalStorageService } from './services/locastorage.service';
import { HomePageComponent } from './home-page/home-page.component';
import { MenuComponent } from './menu/menu.component';
import { SharedService } from './services/sharedService';

@NgModule({
  declarations: [
    AppComponent,
    ClientPageComponent,
    JuryDialogPageComponent,
    AdminDialogPageComponent,
    JuryPageComponent,
    AdminPageComponent,
    LoginPageComponent,
    HomePageComponent,
    MenuComponent,
  ],
  entryComponents: [JuryDialogPageComponent, AdminDialogPageComponent],
  imports: [
    BrowserModule, MatTableModule, MatSortModule, RoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatTabsModule,
    MatInputModule, MatSelectModule, MatDialogModule, MatButtonModule, MatToolbarModule, MatCardModule, MatListModule, MatSliderModule, MatExpansionModule,
    MatIconModule, MatStepperModule, MatSnackBarModule, MatGridListModule, MatCheckboxModule, MatSlideToggleModule, MatTooltipModule, MatMenuModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    LocalStorageService,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
