import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';
import { NOTE_TITLE_MAX_LENGTH } from '../../../data/note.model';

@Component({
  selector: 'app-create-note-dialog',
  imports: [FormsModule],
  templateUrl: './create-note-dialog.component.html',
  styleUrl: './create-note-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNoteDialogComponent {
  private readonly dialogRef = inject<DialogRef<string>>(DialogRef);

  protected readonly titleMaxLength = NOTE_TITLE_MAX_LENGTH;
  protected readonly draftTitle = signal('');

  protected submit(): void {
    const title = this.draftTitle().trim();
    if (!title) return;

    this.dialogRef.close(title);
  }

  protected cancel(): void {
    this.dialogRef.close();
  }
}
