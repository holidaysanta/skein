import { FormsModule } from '@angular/forms';
import { NotesStore } from '../../../data/notes.store';
import {
  Component,
  computed,
  inject,
  input,
  ChangeDetectionStrategy,
  viewChild,
} from '@angular/core';
import { Note, NOTE_TITLE_MAX_LENGTH } from '../../../data/note.model';
import { MarkdownEditorComponent } from '../../../shared/markdown-editor/markdown-editor.component';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-note-detail',
  imports: [FormsModule, MarkdownEditorComponent],
  templateUrl: './note-detail.component.html',
  styleUrl: './note-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'mx-auto px-22 min-h-full max-w-5xl flex flex-col' },
})
export class NoteDetailComponent {
  private readonly router = inject(Router);
  private readonly notesStore = inject(NotesStore);

  readonly id = input.required<string>();

  private readonly markdownEditor = viewChild(MarkdownEditorComponent);

  protected readonly titleMaxLength = NOTE_TITLE_MAX_LENGTH;

  protected readonly note = computed(() => this.notesStore.notes().find((n) => n.id === this.id()));

  // Досылаем текст до смены заметки: на NavigationStart id() ещё старый,
  // а уход с клавиатуры (Alt+←) не вызывает blur
  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        takeUntilDestroyed()
      )
      .subscribe(() => this.markdownEditor()?.flush());
  }

  protected updateNote(changes: Partial<Note>): void {
    this.notesStore.updateNote(this.id(), changes);
  }
}
