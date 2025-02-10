import { createActionGroup, props } from '@ngrx/store';
import { CollectionRequest } from '../model/collection-request.model';

export const CollectionActions = createActionGroup({
  source: 'Collection',
  events: {
    'create collection': props<{ collection: CollectionRequest }>(),
    'update collection': props<{ collection: CollectionRequest }>(),
    'update collection status': props<{ collection: CollectionRequest }>(),
    'remove collection': props<{ collectionid: string }>(),
    'load collections from storage': props<{ collections: CollectionRequest[] }>(), 
    'awardPoints': props<{ userId: string; points: number }>(),
  }
});
