import {
  ApplicationConfig,
  inject,
  LOCALE_ID,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { ThemeStore } from './core/theme.store';
import { DEFAULT_DIALOG_CONFIG, DialogConfig } from '@angular/cdk/dialog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),

    {
      provide: DEFAULT_DIALOG_CONFIG,
      useValue: {
        ...new DialogConfig(),
        panelClass: 'app-dialog',
        backdropClass: ['cdk-overlay-dark-backdrop', 'app-dialog-backdrop'],
        maxHeight: 'calc(100dvh - 2rem - 2 * var(--dialog-lift, 0px))',
        maxWidth: 'calc(100dvw - 2rem)',
      },
    },

    { provide: LOCALE_ID, useValue: 'ru' },

    provideAppInitializer(() => {
      inject(ThemeStore);
    }),
  ],
};
