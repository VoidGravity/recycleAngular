import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../collection.reducer';
import { CollectionActions } from '../collection.actions';

@Injectable()
export class CollectionEffects {
  constructor(
    private actions$: Actions,
    private store: Store<{ collection: State }>
  ) {}

  persistState$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CollectionActions.createCollection,
          CollectionActions.updateCollection,
          CollectionActions.updateCollectionStatus,
          CollectionActions.removeCollection
        ),
        withLatestFrom(this.store.select('collection')),
        tap(([action, collectionState]) => {
          localStorage.setItem('collectionState', JSON.stringify(collectionState));
          console.log('State persisted to localStorage successfully.');
        })
      ),
    { dispatch: false }
  );
}
