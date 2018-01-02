import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientPageComponent } from "../client-page/client-page.component";
import { JuryPageComponent } from "../jury-page/jury-page.component";
import { AdminPageComponent } from "../admin-page/admin-page.component";

const appRoutes: Routes = [

  { path: "", component: ClientPageComponent },
  { path: "jury", component: JuryPageComponent },
  { path: "admin", component: ClientPageComponent },

]


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
