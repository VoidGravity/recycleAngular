import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const TestActions = createActionGroup({
  source: 'Test',
  events: {
    'Load Tests': emptyProps(),
    'Load Tests Success': props<{ data: unknown }>(),
    'Load Tests Failure': props<{ error: unknown }>(),
    'test action' : emptyProps()
  }
});
