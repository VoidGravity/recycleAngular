import { createReducer, on } from '@ngrx/store';
import { CollectionActions } from './collection.actions';
import { CollectionRequest } from '../model/collection-request.model';

export const collectionFeatureKey = 'collection';

export interface State {
  collections: CollectionRequest[]; 

}

export const initialState: State = {
  collections: []
};

export const reducer = createReducer(
  initialState,
  on(CollectionActions.createCollection,(state,{ collection } )=>({
    ...state,
    collections:[...state.collections ,collection]

  })),
  
);

