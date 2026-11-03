import { computed, inject, Injectable, Signal } from '@angular/core';
import { NotesStore } from './notes.store';
import { SpacesStore } from './spaces.store';
import { Note } from './note.model';
import { Space, SpaceColor } from './space.model';

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

  removeNoteFromSpace(noteId: string, spaceId: string) {
    this.spacesStore.removeNoteFromSpace(noteId, spaceId);
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

  createSpace(name: string, icon: string, color: SpaceColor): string {
    const id = crypto.randomUUID();

    this.spacesStore.addSpace({
      id,
      name,
      icon,
      color,
      createdAt: Date.now(),
    });

    return id;
  }

  notesForSpace(spaceId: Signal<string | undefined>): Signal<Note[]> {
    const spaceNoteIds = computed(() => {
      const activeSpaceId = spaceId();
      if (!activeSpaceId) return new Set<string>();

      const noteIds = this.spacesStore
        .links()
        .filter((link) => link.spaceId === activeSpaceId)
        .map((link) => link.noteId);

      return new Set(noteIds);
    });

    const visibleNotes = computed(() => {
      if (!spaceId()) return this.notesStore.notes();

      return this.notesStore.notes().filter((note) => spaceNoteIds().has(note.id));
    });

    return visibleNotes;
  }
}
