import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { collectionReducer  } from './store/collection.reducer';
import { CollectionEffects } from './store/effects/collection.effects';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideStore(),
    provideStore({ collection: collectionReducer}),
    provideEffects([CollectionEffects]),
    provideHttpClient(), 



  ]
};
