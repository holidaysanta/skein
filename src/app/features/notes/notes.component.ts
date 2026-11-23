import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NoteListItemComponent } from './note-list-item/note-list-item.component';
import { filter } from 'rxjs';
import { LibraryFacade } from '../../data/library.facade';
import { Dialog } from '@angular/cdk/dialog';
import {
  CreateNoteDialogComponent,
  CreateNoteDialogData,
  CreateNoteDialogResult,
} from './create-note-dialog/create-note-dialog.component';
import { SpacesStore } from '../../data/spaces.store';
import { Space } from '../../data/space.model';
import {
  DeleteSpaceDialogComponent,
  DeleteSpaceDialogData,
} from '../spaces/delete-space-dialog/delete-space-dialog.component';
import { SPACE_COLOR_VALUES } from '../../shared/space-colors';
import {
  RemoveNoteDialogComponent,
  RemoveNoteDialogData,
} from './remove-note-dialog/remove-note-dialog.component';
import { Note } from '../../data/note.model';

import {
  NoteSpaceDialogData,
  NoteSpaceDialogResult,
  NoteSpacesDialogComponent,
} from './note-spaces-dialog/note-spaces-dialog.component';
import { NoteListHeaderComponent } from './note-list-header/note-list-header.component';
import { SpaceDialogsService } from '../spaces/space-dialogs.service';

@Component({
  selector: 'app-notes',
  imports: [RouterOutlet, NoteListItemComponent, NoteListHeaderComponent],
  templateUrl: './notes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'col-start-2 col-span-2 row-start-1 grid grid-cols-subgrid min-h-0 min-w-0' },
})
export class NotesComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(Dialog);
  private readonly library = inject(LibraryFacade);
  private readonly spaceStore = inject(SpacesStore);
  private readonly spaceDialogs = inject(SpaceDialogsService);

  readonly spaceId = input<string>();

  private readonly scrollContainer = viewChild.required<ElementRef<HTMLElement>>('scrollContainer');

  protected readonly visibleNotes = this.library.notesForSpace(this.spaceId);

  protected readonly noteCount = computed(() => this.visibleNotes().length);

  protected readonly currentSpace = computed(() => {
    return this.spaceStore.spaces().find((space) => space.id === this.spaceId());
  });

  protected readonly spaceColorValue = computed(() => {
    const space = this.currentSpace();

    return space ? SPACE_COLOR_VALUES[space.color] : 'var(--accent)';
  });

  constructor() {
    // Прокручивается <main>, а не окно, поэтому встроенный сброс прокрутки роутера сюда не дотягивается
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => (this.scrollContainer().nativeElement.scrollTop = 0));
  }

  protected openCreateNoteDialog(): void {
    const spaceId = this.spaceId();

    const dialogRef = this.dialog.open<CreateNoteDialogResult, CreateNoteDialogData>(
      CreateNoteDialogComponent,
      {
        data: {
          initialSpaceIds: spaceId ? [spaceId] : [],
        },
        ariaLabelledBy: 'create-note-title',
      }
    );

    dialogRef.closed.subscribe((result) => {
      if (!result) return;

      const id = this.library.createNote(result.title, result.spaceIds);

      if (spaceId && result.spaceIds.includes(spaceId)) {
        this.router.navigate(['/spaces', spaceId, 'notes', id]);
      } else {
        this.router.navigate(['/notes', id]);
      }
    });
  }

  // В пространстве убираем только связь; в общем списке удаляем заметку полностью.
  protected openRemoveNoteDialog(note: Note): void {
    const spaceId = this.spaceId();

    const dialogRef = this.dialog.open<boolean, RemoveNoteDialogData>(RemoveNoteDialogComponent, {
      data: {
        title: note.title,
        action: spaceId ? 'unlink' : 'delete',
      },
      ariaLabelledBy: 'remove-note-title',
    });

    dialogRef.closed.subscribe((confirmed) => {
      if (!confirmed) return;

      const isCurrentNoteOpen = this.route.firstChild?.snapshot.paramMap.get('id') === note.id;

      if (spaceId) {
        this.library.removeNoteFromSpace(note.id, spaceId);
      } else {
        this.library.deleteNote(note.id);
      }

      if (isCurrentNoteOpen) {
        if (spaceId) {
          this.router.navigate(['/spaces', spaceId]);
        } else {
          this.router.navigate(['/notes']);
        }
      }
    });
  }

  protected openNoteSpaceDialog(note: Note): void {
    const initialSpaceIds = this.spaceStore
      .links()
      .filter((link) => link.noteId === note.id)
      .map((link) => link.spaceId);

    const dialogRef = this.dialog.open<NoteSpaceDialogResult, NoteSpaceDialogData>(
      NoteSpacesDialogComponent,
      {
        data: {
          title: note.title,
          initialSpaceIds,
        },
        ariaLabelledBy: 'note-spaces-title',
      }
    );

    dialogRef.closed.subscribe((result) => {
      if (!result) return;

      const spaceId = this.spaceId();
      const isCurrentNoteOpen = this.route.firstChild?.snapshot.paramMap.get('id') === note.id;

      this.library.setNoteSpaces(note.id, result.spaceIds);

      if (spaceId && isCurrentNoteOpen && !result.spaceIds.includes(spaceId)) {
        this.router.navigate(['/spaces', spaceId]);
      }
    });
  }

  protected openDeleteSpaceDialog(space: Space): void {
    this.spaceDialogs.openDeleteSpaceDialog(space);
  }

  protected openEditSpaceDialog(space: Space): void {
    this.spaceDialogs.openEditSpaceDialog(space);
  }
}
