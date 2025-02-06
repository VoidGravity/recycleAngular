import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CollectionActions = createActionGroup({
  source: 'Collection',
  events: {
    
    'create collection': props<{ data: unknown }>(),
    'update collection': props<{ data: unknown }>(),
    'update collection status' : props<{data: unknown}>(),

  }
});
 