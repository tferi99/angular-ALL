import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CtxMenuModule } from './ctx-menu/ctx-menu.module';
import { HomePageComponent } from './home-page/home-page.component';
import { Page404Component } from './page404/page404.component';
import { TemplatingModule } from './templating/templating.module';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),

    CtxMenuModule,
    TemplatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
