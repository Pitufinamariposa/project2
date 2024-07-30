import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import {initializeApp,provideFirebaseApp} from '@angular/fire/app';
import {getFirestore,provideFirestore} from '@angular/fire/firestore';
import { environment } from '../environments/environment.development';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),provideHttpClient(),
    importProvidersFrom([
      provideFirebaseApp(()=>initializeApp(environment.firebaseConfig)),
      provideFirestore(()=>getFirestore())
      
    ])
  ]
};
