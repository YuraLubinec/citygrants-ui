import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientPageComponent} from "../client-page/client-page.component";

const appRoutes: Routes = [
  
  { path: "", component: ClientPageComponent },

]


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
