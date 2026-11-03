import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SPACE_ICONS, SpaceColor, SpaceIcon } from '../../../data/space.model';
import { SPACE_ICON_LABELS } from '../space-icons';
import { SPACE_COLOR_VALUES } from '../space-colors';

@Component({
  selector: 'app-space-icon-picker',
  imports: [ReactiveFormsModule],
  templateUrl: './space-icon-picker.component.html',
  styleUrl: './space-icon-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceIconPickerComponent {
  readonly control = input.required<FormControl<SpaceIcon>>();
  readonly color = input.required<SpaceColor>();

  protected readonly icons = SPACE_ICONS;
  protected readonly iconLabels = SPACE_ICON_LABELS;
  protected readonly colorValues = SPACE_COLOR_VALUES;
}
