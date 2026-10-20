import { effect, inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export const THEMES = ['graphite', 'midnight', 'macchiato'] as const;
export type Theme = (typeof THEMES)[number];

const STORAGE_KEY = 'skein.theme';
const DEFAULT_THEME = 'graphite';

function isTheme(value: string | null): value is Theme {
  return THEMES.some((theme) => theme === value);
}

function loadTheme(): Theme {
  const saved = localStorage.getItem(STORAGE_KEY);
  return isTheme(saved) ? saved : DEFAULT_THEME;
}

@Injectable({ providedIn: 'root' })
export class ThemeStore {
  private readonly document = inject(DOCUMENT);

  private readonly _theme = signal(loadTheme());

  readonly theme = this._theme.asReadonly();

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, this._theme());
      this.document.documentElement.dataset['theme'] = this._theme();
    });
  }

  setTheme(theme: Theme): void {
    this._theme.set(theme);
  }
}
