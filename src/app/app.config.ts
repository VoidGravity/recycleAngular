import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { reducer } from './store/collection.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideStore(),
    provideStore({ collection: reducer }),
  ]
};
