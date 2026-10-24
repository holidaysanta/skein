import { inject, Injectable } from '@angular/core';
import { NotesStore } from './notes.store';
import { SpacesStore } from './spaces.store';
import { Note } from './note.model';

/**
 * Все изменения заметок и пространств — только через фасад:
 * он следит, чтобы связи между ними оставались целыми.
 * Читать данные можно напрямую из сторов.
 */
@Injectable({ providedIn: 'root' })
export class LibraryFacade {
  private readonly notesStore = inject(NotesStore);
  private readonly spacesStore = inject(SpacesStore);

  deleteNote(id: string): void {
    this.notesStore.deleteNote(id);
    this.spacesStore.removeNote(id);
  }

  createNote(title: string, spaceId?: string): string {
    const id = crypto.randomUUID();

    this.notesStore.addNote({
      id,
      title,
      text: '',
    });

    if (spaceId) {
      this.spacesStore.addNoteToSpace(id, spaceId);
    }

    return id;
  }

  updateNote(id: string, changes: Partial<Note>): void {
    this.notesStore.updateNote(id, changes);
  }
}
