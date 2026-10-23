import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotesStore } from './notes.store';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NoteListItemComponent } from './note-list-item/note-list-item.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { NOTE_TITLE_MAX_LENGTH } from './note.model';
import { ThemePickerComponent } from '../../shared/theme-picker/theme-picker.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-notes',
  imports: [FormsModule, RouterOutlet, NoteListItemComponent, ModalComponent, ThemePickerComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent {
  private readonly router = inject(Router);
  protected readonly notesStore = inject(NotesStore);

  private readonly scrollContainer = viewChild.required<ElementRef<HTMLElement>>('scrollContainer');

  protected readonly titleMaxLength = NOTE_TITLE_MAX_LENGTH;
  protected readonly isCreateOpen = signal(false);
  protected readonly draftTitle = signal('');

  constructor() {
    // Прокручивается <main>, а не окно, поэтому встроенный сброс прокрутки роутера сюда не дотягивается
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => (this.scrollContainer().nativeElement.scrollTop = 0));
  }

  protected createNote(): void {
    const title = this.draftTitle().trim();
    if (!title) return;

    const id = crypto.randomUUID();

    this.notesStore.addNote({
      id,
      title,
      text: '',
    });

    this.closeCreate();

    this.router.navigate(['/notes', id]);
  }

  protected deleteNote(id: string): void {
    const isOpen = this.router.url === `/notes/${id}`;

    this.notesStore.deleteNote(id);

    if (isOpen) {
      this.router.navigate(['/notes']);
    }
  }

  protected openCreate(): void {
    this.draftTitle.set('');
    this.isCreateOpen.set(true);
  }

  protected closeCreate(): void {
    this.isCreateOpen.set(false);
  }
}
