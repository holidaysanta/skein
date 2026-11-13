import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NOTE_TITLE_MAX_LENGTH } from '../../../data/note.model';

@Component({
  selector: 'app-create-note-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './create-note-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNoteDialogComponent {
  private readonly dialogRef = inject<DialogRef<string>>(DialogRef);
  private readonly formBuilder = inject(NonNullableFormBuilder);

  protected readonly titleMaxLength = NOTE_TITLE_MAX_LENGTH;

  protected readonly form = this.formBuilder.group({
    title: this.formBuilder.control('', [
      Validators.required,
      Validators.pattern(/\S/),
      Validators.maxLength(this.titleMaxLength),
    ]),
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const title = this.form.controls.title.value.trim();

    this.dialogRef.close(title);
  }

  protected cancel(): void {
    this.dialogRef.close();
  }
}
