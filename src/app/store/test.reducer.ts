import { createReducer, on } from '@ngrx/store';
import { TestActions } from './test.actions';
import { state } from '@angular/animations';

export const testFeatureKey = 'test';

export interface State {
  test : number
}

export const initialState: State = {
  test : 0
};

export const reducer = createReducer(
  initialState,
  on(TestActions.testAction, state=> ({...state, test: state.test +1}))
);

