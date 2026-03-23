import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { filter, map, concatMap, catchError, delay } from "rxjs/operators";
import { of } from "rxjs";

import * as articlesActions from "../actions/articles";

// simulate request
function makeRequest(timeToDelay) {
  return of("Request Complete!").pipe(delay(timeToDelay));
}

@Injectable()
export class ArticleEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  articles$ = this.actions$.pipe(
    ofType(articlesActions.GET_ARTICLES),
    map((action: articlesActions.GetArticles) => action.payload),
    concatMap((payload: any) => 
      makeRequest(5000).pipe(
        map(() => new articlesActions.GetArticlesSuccess()),
        catchError(error => 
          of(new articlesActions.GetArticlesFailure())
        )
      )
    )
  );
}
