import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

type EditorStylesStatus = 'idle' | 'loading' | 'loaded' | 'error';

@Injectable({
  providedIn: 'root',
})
export class EditorStylesService {
  private readonly document = inject(DOCUMENT);

  private readonly _status = signal<EditorStylesStatus>('idle');

  readonly status = this._status.asReadonly();

  load() {
    if (this.status() === 'loading' || this.status() === 'loaded') return;

    this._status.set('loading');

    const link = this.document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'editor.css';

    link.addEventListener('load', () => {
      this._status.set('loaded');
    });

    link.addEventListener('error', () => {
      link.remove();
      this._status.set('error');
    });

    this.document.head.append(link);
  }
}
