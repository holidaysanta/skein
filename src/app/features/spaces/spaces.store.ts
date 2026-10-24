import { effect, Injectable, signal } from '@angular/core';
import { NoteSpaceLink, Space, SPACE_COLORS } from './space.model';
import { loadList } from '../../core/storage';

const SPACES_KEY = 'skein.spaces';
const LINKS_KEY = 'skein.links';

function isSpace(value: unknown): value is Space {
  if (typeof value !== 'object' || value === null) return false;

  const space = value as Record<string, unknown>;
  return (
    typeof space['id'] === 'string' &&
    typeof space['name'] === 'string' &&
    typeof space['icon'] === 'string' &&
    SPACE_COLORS.some((color) => color === space['color']) &&
    typeof space['createdAt'] === 'number'
  );
}

function isNoteSpaceLink(value: unknown): value is NoteSpaceLink {
  if (typeof value !== 'object' || value === null) return false;

  const link = value as Record<string, unknown>;
  return typeof link['noteId'] === 'string' && typeof link['spaceId'] === 'string';
}

@Injectable({ providedIn: 'root' })
export class SpacesStore {
  private readonly _spaces = signal(loadList(SPACES_KEY, isSpace));
  private readonly _links = signal(loadList(LINKS_KEY, isNoteSpaceLink));

  readonly spaces = this._spaces.asReadonly();
  readonly links = this._links.asReadonly();

  constructor() {
    effect(() => {
      localStorage.setItem(SPACES_KEY, JSON.stringify(this._spaces()));
    });

    effect(() => {
      localStorage.setItem(LINKS_KEY, JSON.stringify(this._links()));
    });
  }

  addSpace(space: Space): void {
    this._spaces.update((spaces) => [...spaces, space]);
  }

  addNoteToSpace(noteId: string, spaceId: string): void {
    const exists = this._links().some((link) => link.noteId === noteId && link.spaceId === spaceId);

    if (exists) return;

    this._links.update((links) => [...links, { noteId, spaceId }]);
  }

  removeNote(noteId: string): void {
    this._links.update((links) => links.filter((link) => link.noteId !== noteId));
  }

  removeNoteFromSpace(noteId: string, spaceId: string): void {
    this._links.update((links) =>
      links.filter((link) => !(link.noteId === noteId && link.spaceId === spaceId))
    );
  }

  deleteSpace(spaceId: string): void {
    this._spaces.update((spaces) => spaces.filter((space) => space.id !== spaceId));
    this._links.update((links) => links.filter((link) => link.spaceId !== spaceId));
  }
}
