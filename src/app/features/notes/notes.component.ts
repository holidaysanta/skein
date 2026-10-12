import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotesStore } from './notes.store';
import { Router, RouterOutlet } from '@angular/router';
import { NoteListItemComponent } from './note-list-item/note-list-item.component';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-notes',
  imports: [FormsModule, RouterOutlet, NoteListItemComponent, ModalComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent {
  private readonly router = inject(Router);
  protected readonly notesStore = inject(NotesStore);

  protected readonly isCreateOpen = signal(false);

  protected readonly draftTitle = signal('');

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
