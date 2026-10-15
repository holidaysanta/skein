import { NotesStore } from '../notes.store';
import {
  Component,
  computed,
  inject,
  input,
  ChangeDetectionStrategy,
  linkedSignal,
} from '@angular/core';
import { Note } from '../note.model';
import { NoteViewComponent } from '../note-view/note-view.component';
import { NoteEditorComponent } from '../note-editor/note-editor.component';
import { MarkdownEditorComponent } from '../../../shared/markdown-editor/markdown-editor.component';

@Component({
  selector: 'app-note-detail',
  imports: [NoteViewComponent, MarkdownEditorComponent],
  templateUrl: './note-detail.component.html',
  styleUrl: './note-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'h-full flex flex-col gap-4' },
})
export class NoteDetailComponent {
  private readonly notesStore = inject(NotesStore);

  readonly id = input.required<string>();

  protected readonly isEditing = linkedSignal({
    source: this.id,
    computation: () => false,
  });

  protected readonly note = computed(() => this.notesStore.notes().find((n) => n.id === this.id()));

  protected updateNote(changes: Partial<Note>): void {
    this.notesStore.updateNote(this.id(), changes);
  }

  protected startEditing(): void {
    this.isEditing.set(true);
  }

  protected stopEditing(): void {
    this.isEditing.set(false);
  }
}
