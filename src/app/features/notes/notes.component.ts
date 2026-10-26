import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NoteListItemComponent } from './note-list-item/note-list-item.component';
import { ThemePickerComponent } from '../../shared/theme-picker/theme-picker.component';
import { filter } from 'rxjs';
import { LibraryFacade } from '../../data/library.facade';
import { NotesStore } from '../../data/notes.store';
import { Dialog } from '@angular/cdk/dialog';
import { CreateNoteDialogComponent } from './create-note-dialog/create-note-dialog.component';

@Component({
  selector: 'app-notes',
  imports: [RouterOutlet, NoteListItemComponent, ThemePickerComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent {
  private readonly router = inject(Router);
  private readonly dialog = inject(Dialog);

  // Читаем из стора, меняем через фасад
  protected readonly notesStore = inject(NotesStore);
  private readonly library = inject(LibraryFacade);

  private readonly scrollContainer = viewChild.required<ElementRef<HTMLElement>>('scrollContainer');

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
    const isOpen = this.router.url === `/notes/${id}`;

    this.library.deleteNote(id);

    if (isOpen) {
      this.router.navigate(['/notes']);
    }
  }

  protected openDialog(): void {
    const dialogRef = this.dialog.open<string>(CreateNoteDialogComponent);

    dialogRef.closed.subscribe((title) => {
      if (!title) return;

      const id = this.library.createNote(title);

      this.router.navigate(['/notes', id]);
    });
  }
}
