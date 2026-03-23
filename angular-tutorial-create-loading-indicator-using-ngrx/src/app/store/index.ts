/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

import {ActionReducerMap, createSelector, createFeatureSelector} from "@ngrx/store";

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */

import * as fromSpinner from './reducers/loading-spinner';

export interface State {
  loading: fromSpinner.State
}

export const reducers = { 
  loading: fromSpinner.reducer
}


export const getLoadingState = (state: State) => state.loading;

export const isLoadingSpinnerActive = createSelector(
  getLoadingState,
  fromSpinner.isLoadingSpinnerActive
);