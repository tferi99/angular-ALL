import { Action } from "@ngrx/store";
import { ShowLoader, HideLoader } from "../../shared/decorators";

export const GET_ARTICLES = "[Article] Get Articles";
export const GET_ARTICLES_SUCCESS = "[Article] Get Articles success";
export const GET_ARTICLES_FAILURE = "[Article] Get Articles failure";
 
@ShowLoader()
export class GetArticles implements Action {
  readonly type = GET_ARTICLES;
  constructor(public payload?: any) {}
}

@HideLoader(GET_ARTICLES)
export class GetArticlesSuccess implements Action {
  readonly type = GET_ARTICLES_SUCCESS;
  constructor(public payload?: any) {}
}

@HideLoader(GET_ARTICLES)
export class GetArticlesFailure implements Action {
  readonly type = GET_ARTICLES_FAILURE;
  constructor(public payload?: any) {}
}

export type ArticleAction =
  | GetArticles
  | GetArticlesSuccess
  | GetArticlesFailure;
