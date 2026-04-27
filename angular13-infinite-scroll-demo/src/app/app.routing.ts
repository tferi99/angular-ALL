import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {WithCdkComponent} from "./with-cdk/with-cdk.component";
import {WithNgxComponent} from "./with-ngx/with-ngx.component";
import {WithSentinelComponent} from "./with-sentinel/with-sentinel.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sentinel', component: WithSentinelComponent },
  { path: 'cdk', component: WithCdkComponent },
  { path: 'ngx', component: WithNgxComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
