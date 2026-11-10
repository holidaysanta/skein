import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SPACE_ICONS, SpaceColor, SpaceIcon } from '../../../data/space.model';
import { SPACE_ICON_LABELS } from '../space-icons';
import { SPACE_COLOR_VALUES } from '../../../shared/space-colors';

@Component({
  selector: 'app-space-icon-picker',
  imports: [ReactiveFormsModule],
  templateUrl: './space-icon-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block @container' },
})
export class SpaceIconPickerComponent {
  readonly control = input.required<FormControl<SpaceIcon>>();
  readonly color = input.required<SpaceColor>();

  protected readonly icons = SPACE_ICONS;
  protected readonly iconLabels = SPACE_ICON_LABELS;

  protected readonly colorValue = computed(() => {
    return SPACE_COLOR_VALUES[this.color()];
  });
}
