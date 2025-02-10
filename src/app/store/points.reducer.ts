import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { PointsActions } from './points.actions';

export const pointsFeatureKey = 'points';

export interface State {
  [userId: string]: number;
}

export const initialState: State = {};

export const reducer = createReducer(
  initialState,
  on(PointsActions.awardPoints, (state, { userId, points }) => ({
    ...state,
    [userId]: (state[userId] || 0) + points,
  })),
  on(PointsActions.convertPoints, (state, { userId, points }) => ({
    ...state,
    [userId]: Math.max(0, (state[userId] || 0) - points),
  }))
);

export const selectPointsFeature = createFeatureSelector<State>(pointsFeatureKey);
export const selectUserPoints = (userId: string) => 
  createSelector(selectPointsFeature, (state) => state[userId] || 0);