import { Injectable, signal, effect } from '@angular/core';
import { Note } from './note.model';

const STORAGE_KEY = 'skein.notes';

function loadNotes(): Note[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

@Injectable({ providedIn: 'root' })
export class NotesStore {
  private readonly _notes = signal<Note[]>(loadNotes());

  readonly notes = this._notes.asReadonly();

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._notes()));
    });
  }

  addNote(note: Note): void {
    this._notes.update((notes) => [...notes, note]);
  }

  updateNote(id: string, changes: Partial<Note>): void {
    this._notes.update((notes) =>
      notes.map((note) => (note.id === id ? { ...note, ...changes } : note))
    );
  }

  deleteNote(id: string): void {
    this._notes.update((notes) => notes.filter((note) => note.id !== id));
  }
}
