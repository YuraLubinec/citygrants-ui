import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientPageComponent } from "../client-page/client-page.component";
import { JuryPageComponent } from "../jury-page/jury-page.component";
import { AdminPageComponent } from "../admin-page/admin-page.component";
import { LoginPageComponent } from "../login-page/login-page.component";
import { LoginGuard } from "./guards/loginGuard";
import { AdminGuard } from "./guards/adminGuard";
import { JuryGuard } from "./guards/juryGuard";
import { HomePageComponent } from '../home-page/home-page.component';
import { MenegeUserPageComponent } from '../meneg-user-page/meneg-user-page.component';

const appRoutes: Routes = [

  { path: "", component: ClientPageComponent },
  { path: "jury", component: JuryPageComponent, canActivate: [JuryGuard] },
  { path: "admin", component: AdminPageComponent, canActivate: [AdminGuard] },
  { path: "login", component: LoginPageComponent, canActivate: [LoginGuard] },
  { path: "home", component: HomePageComponent },
  { path: "menegeUser", component: MenegeUserPageComponent },
  { path: "**", redirectTo: '', pathMatch: 'full' }

]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: [LoginGuard, AdminGuard, JuryGuard],
  declarations: []
})
export class RoutingModule { }
