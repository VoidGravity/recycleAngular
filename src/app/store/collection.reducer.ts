import { createReducer, on } from '@ngrx/store';
import { CollectionActions } from './collection.actions';
import { CollectionRequest } from '../model/collection-request.model';

export interface State {
  collectionRequests: CollectionRequest[];
}

const initialState: State = {
  collectionRequests: JSON.parse(localStorage.getItem('collections') || '[]'),
};

export const collectionReducer = createReducer(
  initialState,
  on(CollectionActions.createCollection, (state, { collection }) => {
    const updatedCollections = [...state.collectionRequests, collection];
    localStorage.setItem('collections', JSON.stringify(updatedCollections));
    return { ...state, collectionRequests: updatedCollections };
  }),
  on(CollectionActions.updateCollection, (state, { collection }) => {
    const updatedCollections = state.collectionRequests.map((col) =>
      col.id === collection.id ? collection : col
    );
    localStorage.setItem('collections', JSON.stringify(updatedCollections));
    return { ...state, collectionRequests: updatedCollections };
  }),
  on(CollectionActions.updateCollectionStatus, (state, { collection }) => {
    const updatedCollections = state.collectionRequests.map((col) =>
      col.id === collection.id ? collection : col
    );
    localStorage.setItem('collections', JSON.stringify(updatedCollections));
    return { ...state, collectionRequests: updatedCollections };
  }),
  on(CollectionActions.removeCollection, (state, { collectionid }) => {
    const updatedCollections = state.collectionRequests.filter((col) => col.id !== collectionid);
    localStorage.setItem('collections', JSON.stringify(updatedCollections));
    return { ...state, collectionRequests: updatedCollections };
  }),
  on(CollectionActions.loadCollectionsFromStorage, (state, { collections }) => {
    localStorage.setItem('collections', JSON.stringify(collections));
    return { ...state, collectionRequests: collections };
  })
);

