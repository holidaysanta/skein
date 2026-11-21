import { IconName } from '../icons';
import { SPACE_COLOR_VALUES } from '../space-colors';
import { SpaceColor } from './../../data/space.model';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-space-badge',
  imports: [],
  templateUrl: './space-badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceBadgeComponent {
  readonly icon = input.required<IconName>();
  readonly color = input.required<SpaceColor | 'accent'>();
  readonly size = input<'sm' | 'md'>('md');

  protected readonly colorValue = computed(() => {
    const color = this.color();

    return color === 'accent' ? 'var(--accent)' : SPACE_COLOR_VALUES[color];
  });
}
