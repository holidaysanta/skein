import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Note } from '../../../data/note.model';

export type RemoveNoteDialogData = Pick<Note, 'title'> & {
  action: 'delete' | 'unlink';
};

@Component({
  selector: 'app-remove-note-dialog',
  imports: [],
  templateUrl: './remove-note-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveNoteDialogComponent {
  private readonly dialogRef = inject<DialogRef<boolean>>(DialogRef);
  protected readonly data = inject<RemoveNoteDialogData>(DIALOG_DATA);

  protected readonly heading =
    this.data.action === 'unlink' ? 'Убрать из пространства?' : 'Удалить заметку навсегда?';
  protected readonly description =
    this.data.action === 'unlink'
      ? 'сохранится во «Всех заметках» и других пространствах.'
      : 'исчезнет из «Всех заметок» и всех пространств.';

  protected confirm(): void {
    this.dialogRef.close(true);
  }

  protected cancel(): void {
    this.dialogRef.close(false);
  }
}
