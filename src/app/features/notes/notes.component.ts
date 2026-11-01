import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NoteListItemComponent } from './note-list-item/note-list-item.component';
import { ThemePickerComponent } from '../../shared/theme-picker/theme-picker.component';
import { filter } from 'rxjs';
import { LibraryFacade } from '../../data/library.facade';
import { Dialog } from '@angular/cdk/dialog';
import { CreateNoteDialogComponent } from './create-note-dialog/create-note-dialog.component';

@Component({
  selector: 'app-notes',
  imports: [RouterOutlet, NoteListItemComponent, ThemePickerComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-1 min-w-0' },
})
export class NotesComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(Dialog);
  private readonly library = inject(LibraryFacade);

  readonly spaceId = input<string>();

  private readonly scrollContainer = viewChild.required<ElementRef<HTMLElement>>('scrollContainer');

  protected readonly visibleNotes = this.library.notesForSpace(this.spaceId);

  constructor() {
    // Прокручивается <main>, а не окно, поэтому встроенный сброс прокрутки роутера сюда не дотягивается
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => (this.scrollContainer().nativeElement.scrollTop = 0));
  }

  protected deleteNote(id: string): void {
    const isCurrentNoteOpen = this.route.firstChild?.snapshot.paramMap.get('id') === id;

    const spaceId = this.spaceId();

    if (spaceId) {
      this.library.removeNoteFromSpace(id, spaceId);
    } else {
      this.library.deleteNote(id);
    }

    if (isCurrentNoteOpen) {
      if (spaceId) {
        this.router.navigate(['/spaces', spaceId]);
      } else {
        this.router.navigate(['/notes']);
      }
    }
  }

  protected openDialog(): void {
    const dialogRef = this.dialog.open<string>(CreateNoteDialogComponent);

    dialogRef.closed.subscribe((title) => {
      if (!title) return;

      const spaceId = this.spaceId();

      const id = this.library.createNote(title, spaceId);

      if (spaceId) {
        this.router.navigate(['/spaces', spaceId, 'notes', id]);
      } else {
        this.router.navigate(['/notes', id]);
      }
    });
  }
}
