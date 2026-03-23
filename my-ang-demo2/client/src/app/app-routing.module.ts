import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { Page404Component } from './page404/page404.component';

// main
import {MainComponent as CtxMenuMain} from './ctx-menu/main/main.component';
import {MainComponent as TemplatingMain} from './templating/main/main.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'ctxmnenu', component: CtxMenuMain },
  { path: 'templating', component: TemplatingMain },

  { path: '',   redirectTo: '/home', pathMatch: 'full' },   // default
  { path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
