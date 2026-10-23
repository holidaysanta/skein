import { TestBed } from '@angular/core/testing';
import { ThemeStore } from './theme.store';

function resetThemeState(): void {
  localStorage.clear();
  delete document.documentElement.dataset['theme'];
}

describe('ThemeStore', () => {
  beforeEach(resetThemeState);
  afterEach(resetThemeState);

  it('откатывается на graphite, если сохранена неизвестная тема', () => {
    localStorage.setItem('skein.theme', 'stupidity');
    const store = TestBed.inject(ThemeStore);
    expect(store.theme()).toBe('graphite');
  });

  it('загружает и применяет сохранённую тему', () => {
    localStorage.setItem('skein.theme', 'midnight');
    const store = TestBed.inject(ThemeStore);

    TestBed.flushEffects();

    expect(store.theme()).toBe('midnight');
    expect(document.documentElement.dataset['theme']).toBe('midnight');
  });

  it('по умолчанию graphite, если тема не сохранена', () => {
    const store = TestBed.inject(ThemeStore);
    expect(store.theme()).toBe('graphite');
  });

  it('setTheme меняет и сохраняет тему', () => {
    const store = TestBed.inject(ThemeStore);

    store.setTheme('midnight');
    TestBed.flushEffects();

    expect(store.theme()).toBe('midnight');
    expect(localStorage.getItem('skein.theme')).toBe('midnight');
    expect(document.documentElement.dataset['theme']).toBe('midnight');
  });
});
