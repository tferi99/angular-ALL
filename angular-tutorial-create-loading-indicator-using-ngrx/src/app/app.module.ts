import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { reducers } from "./store";
import { LoadingIndicatorEffects } from "./store/effects/loading-spinner.effects";
import { ArticleEffects } from "./store/effects/articles.effects";
import { environment } from '../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    StoreModule.forRoot(reducers, {metaReducers: []}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([LoadingIndicatorEffects, ArticleEffects]) ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
