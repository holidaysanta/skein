import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Space } from '../../../data/space.model';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

export type DeleteSpaceDialogData = Pick<Space, 'name'>;

@Component({
  selector: 'app-delete-space-dialog',
  imports: [],
  templateUrl: './delete-space-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteSpaceDialogComponent {
  private readonly dialogRef = inject<DialogRef<boolean>>(DialogRef);
  protected readonly data = inject<DeleteSpaceDialogData>(DIALOG_DATA);

  protected confirm(): void {
    this.dialogRef.close(true);
  }

  protected cancel(): void {
    this.dialogRef.close();
  }
}
