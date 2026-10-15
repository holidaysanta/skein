import { FormsModule } from '@angular/forms';
import { NotesStore } from '../notes.store';
import { Component, computed, inject, input, ChangeDetectionStrategy } from '@angular/core';
import { Note, NOTE_TITLE_MAX_LENGTH } from '../note.model';
import { MarkdownEditorComponent } from '../../../shared/markdown-editor/markdown-editor.component';

@Component({
  selector: 'app-note-detail',
  imports: [FormsModule, MarkdownEditorComponent],
  templateUrl: './note-detail.component.html',
  styleUrl: './note-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'min-h-full flex flex-col gap-4' },
})
export class NoteDetailComponent {
  private readonly notesStore = inject(NotesStore);

  readonly id = input.required<string>();

  protected readonly titleMaxLength = NOTE_TITLE_MAX_LENGTH;

  protected readonly note = computed(() => this.notesStore.notes().find((n) => n.id === this.id()));

  protected updateNote(changes: Partial<Note>): void {
    this.notesStore.updateNote(this.id(), changes);
  }
}
