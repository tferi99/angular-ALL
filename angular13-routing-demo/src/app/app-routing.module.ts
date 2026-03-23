import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'notfound', component: NotFoundComponent },
  { path: '', redirectTo: 'notfound', pathMatch: 'full' }, // default redirect
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,        // enable HashLocationStrategy
    enableTracing: true,     // disable router event logging
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
