import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SPACE_COLORS, SpaceColor } from '../../../data/space.model';
import { SPACE_COLOR_LABELS, SPACE_COLOR_VALUES } from '../space-colors';

@Component({
  selector: 'app-space-color-picker',
  imports: [ReactiveFormsModule],
  templateUrl: './space-color-picker.component.html',
  styleUrl: './space-color-picker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceColorPickerComponent {
  readonly control = input.required<FormControl<SpaceColor>>();

  protected readonly colors = SPACE_COLORS;
  protected readonly colorValues = SPACE_COLOR_VALUES;
  protected readonly colorLabels = SPACE_COLOR_LABELS;
}
