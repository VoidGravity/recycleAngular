import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './collection.reducer';

export const selectCollectionState = createFeatureSelector<State>('collection');

export const selectAllCollections = createSelector(
  selectCollectionState,
  (state: State) => state.collectionRequests
);

export const selectCollectionById = (id: string) => createSelector(
  selectCollectionState,
  (state: State) => state.collectionRequests.find(request => request.id === id)
);
export const selectPendingCollections = createSelector(
    selectAllCollections,
    collections => collections.filter(c => c.status === 'en attente')
  );
