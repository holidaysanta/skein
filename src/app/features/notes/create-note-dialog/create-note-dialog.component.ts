import { SPACE_COLOR_VALUES } from './../../../shared/space-colors';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Note, NOTE_TITLE_MAX_LENGTH } from '../../../data/note.model';
import { SpacesStore } from '../../../data/spaces.store';
import { SpacePickerComponent } from '../../spaces/space-picker/space-picker.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { prioritizeSelectedSpaces } from '../../spaces/prioritize-selected-spaces';

export type CreateNoteDialogData = {
  initialSpaceIds: readonly string[];
};

export type CreateNoteDialogResult = Pick<Note, 'title'> & {
  spaceIds: readonly string[];
};

@Component({
  selector: 'app-create-note-dialog',
  imports: [ReactiveFormsModule, SpacePickerComponent],
  templateUrl: './create-note-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNoteDialogComponent {
  private readonly dialogRef = inject<DialogRef<CreateNoteDialogResult>>(DialogRef);
  private readonly data = inject<CreateNoteDialogData>(DIALOG_DATA);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  protected readonly spaces = inject(SpacesStore).spaces;

  protected readonly titleMaxLength = NOTE_TITLE_MAX_LENGTH;
  protected readonly colorValues = SPACE_COLOR_VALUES;

  protected readonly form = this.formBuilder.group({
    title: this.formBuilder.control('', [
      Validators.required,
      Validators.pattern(/\S/),
      Validators.maxLength(this.titleMaxLength),
    ]),
    spaceIds: this.formBuilder.control<readonly string[]>(this.data.initialSpaceIds),
  });

  private readonly selectedSpaceIds = toSignal(this.form.controls.spaceIds.valueChanges, {
    initialValue: this.form.controls.spaceIds.value,
  });

  protected readonly spaceOptions = computed(() => {
    return prioritizeSelectedSpaces(this.spaces(), this.data.initialSpaceIds);
  });

  protected readonly selectedSpaces = computed(() => {
    const selectedIds = new Set(this.selectedSpaceIds());

    return this.spaceOptions().filter((space) => selectedIds.has(space.id));
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const title = this.form.controls.title.value.trim();
    const spaceIds = this.form.controls.spaceIds.value;

    this.dialogRef.close({
      title,
      spaceIds,
    });
  }

  protected cancel(): void {
    this.dialogRef.close();
  }
}
