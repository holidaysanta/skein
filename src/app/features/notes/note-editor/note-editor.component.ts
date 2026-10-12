import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Note } from '../note.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-editor',
  imports: [FormsModule],
  templateUrl: './note-editor.component.html',
  styleUrl: './note-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteEditorComponent {
  readonly note = input.required<Note>();
  readonly changed = output<Partial<Note>>();
}
