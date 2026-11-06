import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  SPACE_NAME_MAX_LENGTH,
  SpaceColor,
  SpaceDraft,
  SpaceIcon,
} from '../../../data/space.model';
import { SpaceIconPickerComponent } from '../space-icon-picker/space-icon-picker.component';
import { SpaceColorPickerComponent } from '../space-color-picker/space-color-picker.component';
import { SpaceBadgeComponent } from '../../../shared/space-badge/space-badge.component';

export interface SpaceFormDialogData {
  space: SpaceDraft;
}

@Component({
  selector: 'app-space-form-dialog',
  imports: [
    ReactiveFormsModule,
    SpaceIconPickerComponent,
    SpaceColorPickerComponent,
    SpaceBadgeComponent,
  ],
  templateUrl: './space-form-dialog.component.html',
  styleUrl: './space-form-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceFormDialogComponent {
  private readonly dialogRef = inject<DialogRef<SpaceDraft>>(DialogRef);
  private readonly data = inject<SpaceFormDialogData | null>(DIALOG_DATA);

  private readonly formBuilder = inject(NonNullableFormBuilder);

  protected readonly nameMaxLength = SPACE_NAME_MAX_LENGTH;

  protected readonly title = this.data ? 'Редактирование пространства' : 'Новое пространство';
  protected readonly submitLabel = this.data ? 'Сохранить' : 'Создать';

  protected readonly form = this.formBuilder.group({
    name: this.formBuilder.control(this.data?.space.name ?? '', [
      Validators.required,
      Validators.pattern(/\S/),
      Validators.maxLength(SPACE_NAME_MAX_LENGTH),
    ]),
    icon: this.formBuilder.control<SpaceIcon>(
      this.data?.space.icon ?? 'messages-square',
      Validators.required
    ),
    color: this.formBuilder.control<SpaceColor>(
      this.data?.space.color ?? 'blue',
      Validators.required
    ),
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
