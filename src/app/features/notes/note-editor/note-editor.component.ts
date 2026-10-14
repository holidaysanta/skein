import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Note, NOTE_TITLE_MAX_LENGTH } from '../note.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-editor',
  imports: [FormsModule],
  templateUrl: './note-editor.component.html',
  styleUrl: './note-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-4' },
})
export class NoteEditorComponent {
  readonly note = input.required<Note>();
  readonly changed = output<Partial<Note>>();

  protected readonly titleMaxLength = NOTE_TITLE_MAX_LENGTH;
}
