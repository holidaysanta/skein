import { SPACE_COLOR_VALUES } from '../space-colors';
import { SpaceColor, SpaceIcon } from './../../data/space.model';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-space-badge',
  imports: [],
  templateUrl: './space-badge.component.html',
  styleUrl: './space-badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceBadgeComponent {
  readonly icon = input.required<SpaceIcon>();
  readonly color = input.required<SpaceColor>();

  protected readonly colorValue = computed(() => {
    return SPACE_COLOR_VALUES[this.color()];
  });
}
