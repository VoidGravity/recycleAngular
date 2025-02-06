import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CollectionRequest } from '../model/collection-request.model';

export const CollectionActions = createActionGroup({
  source: 'Collection',
  events: {
    
    'create collection': props<{ collection: CollectionRequest }>(),
    'update collection': props<{ collection: CollectionRequest }>(),
    'update collection status' : props<{collection: CollectionRequest}>(),
    'remove Collection': props<{ collectionid: string }>(),
    'Load Collections From Storage': props<{ collections: CollectionRequest[] }>()


  }
});
 