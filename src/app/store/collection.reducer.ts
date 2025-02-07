import { createReducer, on } from '@ngrx/store';
import { CollectionActions } from './collection.actions';
import { CollectionRequest } from '../model/collection-request.model';
import storeData from './db/store.json';

export const collectionFeatureKey = 'collection';

export interface State {
  // collections: CollectionRequest[]; 
  collectionRequests: CollectionRequest[];


}

export const initialState: State = {
  // collections: []
  collectionRequests: storeData.collectionRequests

};

export const reducer = createReducer(
  initialState,
  on(CollectionActions.createCollection, (state, { collection }) => ({
    ...state,
    collectionRequests: [...state.collectionRequests, collection]
  })),
  on(CollectionActions.updateCollection, (state, { collection }) => ({
    ...state,
    collectionRequests: state.collectionRequests.map(req =>
      req.id === collection.id ? collection : req
    )
  })),
  on(CollectionActions.updateCollectionStatus, (state, { collection }) => ({
    ...state,
    collectionRequests: state.collectionRequests.map(req =>
      req.id === collection.id ? collection : req
    )
  })),
  on(CollectionActions.removeCollection, (state, { collectionid }) => ({
    ...state,
    collectionRequests: state.collectionRequests.filter(req => req.id !== collectionid)
  })),
  on(CollectionActions.loadCollectionsFromStorage, (state, { collections }) => ({
    ...state,
    collectionRequests: collections
  }))

);

