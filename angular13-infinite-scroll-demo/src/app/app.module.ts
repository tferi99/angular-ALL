import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from "./app.routing";
import { WithCdkComponent } from './with-cdk/with-cdk.component';
import { WithNgxComponent } from './with-ngx/with-ngx.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {WithSentinelComponent} from "./with-sentinel/with-sentinel.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WithSentinelComponent,
    WithCdkComponent,
    WithNgxComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ScrollingModule,
    InfiniteScrollModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
