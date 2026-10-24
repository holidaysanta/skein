import { Injectable, signal, effect } from '@angular/core';
import { Note } from './note.model';
import { loadList } from '../core/storage';

const STORAGE_KEY = 'skein.notes';

function isNote(value: unknown): value is Note {
  if (typeof value !== 'object' || value === null) return false;

  const note = value as Record<string, unknown>;
  return (
    typeof note['id'] === 'string' &&
    typeof note['title'] === 'string' &&
    typeof note['text'] === 'string'
  );
}

@Injectable({ providedIn: 'root' })
export class NotesStore {
  private readonly _notes = signal(loadList(STORAGE_KEY, isNote));

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
