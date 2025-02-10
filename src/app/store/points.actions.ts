import { createActionGroup, props } from '@ngrx/store';

export const PointsActions = createActionGroup({
  source: 'Points',
  events: {
    'Award Points': props<{ userId: string; points: number }>(),
    'Convert Points': props<{ userId: string; points: number; voucherValue: number }>(),
  },
});
