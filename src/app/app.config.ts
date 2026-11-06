import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { ThemeStore } from './core/theme.store';
import { DEFAULT_DIALOG_CONFIG, DialogConfig, DialogRef } from '@angular/cdk/dialog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    {
      provide: DEFAULT_DIALOG_CONFIG,
      useValue: { ...new DialogConfig(), panelClass: 'app-dialog' },
    },
    provideAppInitializer(() => {
      inject(ThemeStore);
    }),
  ],
};
