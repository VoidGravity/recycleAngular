import { createSelector } from '@ngrx/store';
import { State as PointsState } from './points.reducer';

export const selectUserPoints = (userId: string) => 
  createSelector(
    (state: PointsState) => state, 
    (pointsState: PointsState) => pointsState[userId] || 0
  );
