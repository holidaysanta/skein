import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-note-empty',
  template: ` <p>Выберите заметку слева</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'h-full flex items-center justify-center text-muted' },
})
export class NoteEmptyComponent {}
