import { Component } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from "rxjs";

import { } from "./store/";

import * as articleActions from "./store/actions/articles";

import * as fromSpinner from "./store/reducers/loading-spinner";

import {isLoadingSpinnerActive , State as AppState} from './store';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
}) 
export class AppComponent  {
  name = 'Angular';

  isLoading: Observable<any>;

  constructor(private store: Store<AppState>) {
    // this.isLoading = this.store.select<any>(state => state.loadingSpinner.active); 
    this.isLoading = this.store.pipe(
      select((state: AppState) => state.loading.active)
      )

    this.isLoading.subscribe(data => console.log(data));
  } 

  ngOnInit() {
  
  }

  getArticles() {
    this.store.dispatch(new articleActions.GetArticles());
  }
}
