import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Space, SpaceColor, SpaceIcon } from '../../../data/space.model';
import { SPACE_COLOR_VALUES } from '../space-colors';
import { SpaceIconPickerComponent } from '../space-icon-picker/space-icon-picker.component';
import { SpaceColorPickerComponent } from '../space-color-picker/space-color-picker.component';

export type CreateSpaceDialogResult = Pick<Space, 'name' | 'icon' | 'color'>;

@Component({
  selector: 'app-create-space-dialog',
  imports: [ReactiveFormsModule, SpaceIconPickerComponent, SpaceColorPickerComponent],
  templateUrl: './create-space-dialog.component.html',
  styleUrl: './create-space-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateSpaceDialogComponent {
  private readonly dialogRef = inject<DialogRef<CreateSpaceDialogResult>>(DialogRef);

  protected readonly colorValues = SPACE_COLOR_VALUES;

  private readonly formBuilder = inject(NonNullableFormBuilder);

  protected readonly form = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required, Validators.pattern(/\S/)]),
    icon: this.formBuilder.control<SpaceIcon>('messages-square', Validators.required),
    color: this.formBuilder.control<SpaceColor>('blue', Validators.required),
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const result = this.form.getRawValue();

    this.dialogRef.close({
      ...result,
      name: result.name.trim(),
    });
  }

  protected cancel(): void {
    this.dialogRef.close();
  }
}
