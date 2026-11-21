import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Note } from '../../../data/note.model';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { SpacePickerComponent } from '../../spaces/space-picker/space-picker.component';
import { SpacesStore } from '../../../data/spaces.store';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { prioritizeSelectedSpaces } from '../../spaces/prioritize-selected-spaces';
import { toSignal } from '@angular/core/rxjs-interop';

export type NoteSpaceDialogData = Pick<Note, 'title'> & {
  initialSpaceIds: readonly string[];
};

export type NoteSpaceDialogResult = {
  spaceIds: readonly string[];
};

@Component({
  selector: 'app-note-spaces-dialog',
  imports: [ReactiveFormsModule, SpacePickerComponent],
  templateUrl: './note-spaces-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteSpacesDialogComponent {
  private readonly dialogRef = inject<DialogRef<NoteSpaceDialogResult>>(DialogRef);
  private readonly spaces = inject(SpacesStore).spaces;
  protected readonly data = inject<NoteSpaceDialogData>(DIALOG_DATA);

  protected readonly spaceIdsControl = new FormControl<readonly string[]>(
    this.data.initialSpaceIds,
    { nonNullable: true }
  );

  protected readonly selectedSpaceIds = toSignal(this.spaceIdsControl.valueChanges, {
    initialValue: this.spaceIdsControl.value,
  });

  protected readonly isUnchanged = computed(() => {
    const selectedIds = this.selectedSpaceIds();

    const initialIds = new Set(this.data.initialSpaceIds);

    if (selectedIds.length !== initialIds.size) return false;

    return selectedIds.every((id) => initialIds.has(id));
  });

  protected readonly spaceOptions = computed(() => {
    return prioritizeSelectedSpaces(this.spaces(), this.data.initialSpaceIds);
  });

  protected submit(): void {
    if (this.isUnchanged()) return;

    const spaceIds = this.spaceIdsControl.value;
    this.dialogRef.close({ spaceIds });
  }

  protected cancel(): void {
    this.dialogRef.close();
  }
}
